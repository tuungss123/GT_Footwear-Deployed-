from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Cart, OrderItem
from .serializers import ProductSerializer, OrderSerializer, CartSerializer, OrderItemSerializer
from django.db.models import Sum, F, DecimalField
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def product_list(request):
    # Retrieve all products
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_order(request):
    # Create a new order
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        # Save the order
        order = serializer.save()

        # Retrieve cart items associated with the current session
        cart_items = Cart.objects.filter(session_key=request.session.session_key)

        # Loop through cart items and create order items for each
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                size=cart_item.size,
                quantity=cart_item.quantity
            )

        # Clear the cart after creating the order
        Cart.objects.filter(session_key=request.session.session_key).delete()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_to_cart(request):
    serializer = CartSerializer(data=request.data)
    if serializer.is_valid():
        # Set the session key in the serializer before saving
        serializer.validated_data['session_key'] = request.session.session_key
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_cart_item(request, pk):
    cart_item = get_object_or_404(Cart, pk=pk, session_key=request.session.session_key)
    serializer = CartSerializer(cart_item, data=request.data)
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

@api_view(['GET'])
def get_cart_total(request):
    total = Cart.objects.filter(session_key=request.session.session_key).aggregate(total_price=Sum(F('product__price') * F('quantity'), output_field=DecimalField()))
    return Response({'total': total['total_price']})

@api_view(['GET'])
def get_cart_items(request):
    cart_items = Cart.objects.filter(session_key=request.session.session_key)
    serializer = CartSerializer(cart_items, many=True)
    return Response(serializer.data)