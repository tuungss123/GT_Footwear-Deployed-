from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='productlist'),
    path('brands/', views.get_brand, name='brands'),
    path('sizes/<int:product_id>/', views.get_sizes_by_product, name='get_sizes_by_product'),
    path('order/create/', views.create_order, name='create_order'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/update/<int:pk>/', views.update_cart_item, name='update_cart_item'),
    path('cart/remove/<int:pk>/', views.remove_cart_item, name='remove_cart_item'),
    path('cart/clear/', views.clear_cart, name='clear_cart'),
    path('cart/items/', views.get_cart_items, name='get_cart_items'),
    path('checkout/create/', views.create_checkout_session, name='create_checkout_session'),
    path('checkout/success/', views.checkout_success, name='checkout_success'),
    path('orders/', views.list_orders, name='list_orders'),
]
