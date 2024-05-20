from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('gt/', include('gt.urls')),
    path('admin/', admin.site.urls),
]
