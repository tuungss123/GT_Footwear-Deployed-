from rest_framework import serializers
from .models import Product, Order, Cart, OrderItem, Size

class ProductSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
class SizeSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Size
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    size = SizeSerializer()
    class Meta:
        model = Cart
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'