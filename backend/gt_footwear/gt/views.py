from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Cart, Order, OrderItem, Size, Brand
from .serializers import ProductSerializer, OrderSerializer, CartSerializer, UpdateCartSerializer, SizeSerializer, BrandsSerializer
from django.shortcuts import get_object_or_404
from django.conf import settings
import requests
import base64

# Utility function to encode API key
def encode_api_key(api_key):
    return base64.b64encode(f'{api_key}:'.encode()).decode()

@api_view(['POST'])
def create_checkout_session(request):
    amount = request.data.get('amount')
    order_id = request.data.get('order_id')

    if amount is None or order_id is None:
        return Response({'error': 'Amount and order_id are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        amount = int(amount)  # Convert amount to integer (in cents)
    except ValueError:
        return Response({'error': 'Amount must be an integer'}, status=status.HTTP_400_BAD_REQUEST)

    if amount < 2000:
        return Response({'error': 'The amount cannot be less than 2000 PHP'}, status=status.HTTP_400_BAD_REQUEST)

    # Retrieve the order from the database using the provided order_id
    order = get_object_or_404(Order, id=order_id)
    order_items = OrderItem.objects.filter(order=order)

    if not order_items.exists():
        return Response({'error': 'Order has no items'}, status=status.HTTP_400_BAD_REQUEST)

    # Create line items from order items
    line_items = []
    for item in order_items:
        line_items.append({
            "amount": int(item.product.price * 100),  # Convert price to cents
            "currency": "PHP",
            "name": item.product.name,
            "quantity": item.quantity
        })

    url = 'https://api.paymongo.com/v1/checkout_sessions'
    headers = {
        'Authorization': f'Basic {encode_api_key(settings.PAYMONGO_API_KEY)}',
        'Content-Type': 'application/json'
    }
    data = {
        "data": {
            "attributes": {
                "line_items": line_items,
                "payment_method_types": [
                                            "card",
                                            "gcash",
                                            "qrph",
                                            "billease",
                                            "dob",
                                            "dob_ubp",
                                            "brankas_bdo",
                                            "brankas_landbank",
                                            "brankas_metrobank",
                                            "grab_pay",
                                            "paymaya"
                                        ],  
                "currency": "PHP",
                "capture_type": "automatic",
                "return_url": "https://localhost:5173/",
                "cancel_url": "https://localhost:5173/cart/",  
                "metadata": {
                    "order_id": order_id  # Set dynamic metadata
                }
            }
        }
    }

    response = requests.post(url, json=data, headers=headers)
    response_data = response.json()

    if response.status_code == 200:
        checkout_url = response_data['data']['attributes']['checkout_url']
        return Response({'checkout_url': checkout_url})
    else:
        return Response({'error': response_data.get('errors', 'Unknown error')}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def checkout_success(request):
    session_id = request.GET.get('session_id')

    if not session_id:
        return Response({'error': 'session_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    url = f'https://api.paymongo.com/v1/checkout_sessions/{session_id}'
    headers = {
        'Authorization': f'Basic {encode_api_key(settings.PAYMONGO_API_KEY)}',
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)
    response_data = response.json()

    if response.status_code != 200:
        return Response({'error': 'Failed to retrieve session details'}, status=status.HTTP_400_BAD_REQUEST)

    session_data = response_data['data']['attributes']

    if session_data['status'] != 'paid':
        return Response({'error': 'Payment was not successful'}, status=status.HTTP_400_BAD_REQUEST)

    order_id = session_data.get('metadata', {}).get('order_id')

    if not order_id:
        return Response({'error': 'Order ID is missing'}, status=status.HTTP_400_BAD_REQUEST)

    # Update the order status
    order = get_object_or_404(Order, id=order_id)
    order.status = 'Completed'
    order.save()

    # Clear the cart after a successful order
    Cart.objects.filter(session_key=request.session.session_key).delete()

    return Response({'message': 'Payment successful! Your order is confirmed.'}, status=status.HTTP_200_OK)



@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_sizes_by_product(request, product_id):
    size = Size.objects.filter(product_id=product_id)
    serializer = SizeSerializer(size, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        order = serializer.save()
        cart_items = Cart.objects.filter(session_key=request.session.session_key)

        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                size=cart_item.size,
                quantity=cart_item.quantity
            )

        Cart.objects.filter(session_key=request.session.session_key).delete()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_cart_item(request, pk):
    cart_item = get_object_or_404(Cart, pk=pk, session_key=request.session.session_key)
    serializer = UpdateCartSerializer(cart_item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def remove_cart_item(request, pk):
    cart_item = get_object_or_404(Cart, pk=pk, session_key=request.session.session_key)
    cart_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def clear_cart(request):
    Cart.objects.filter(session_key=request.session.session_key).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def add_to_cart(request):
    try:
        if not request.session.session_key:
            request.session.save()
            
        session_key = request.session.session_key

        product_id = request.data.get('product')
        quantity = request.data.get('quantity')
        size_id = request.data.get('size')

        cart_item = Cart.objects.create(
            product_id=product_id,
            quantity=quantity,
            size_id=size_id,
            session_key=session_key
        )

        serializer = CartSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_cart_items(request):
    session_key = request.session.session_key
    
    cart_items = Cart.objects.filter(session_key=session_key)
    serializer = CartSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_brand(request):
    brands = Brand.objects.all()
    serializer = BrandsSerializer(brands, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def list_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
