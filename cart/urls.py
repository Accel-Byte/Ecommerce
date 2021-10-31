from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
router.register('cart', MyCart, basename="MyCart")

urlpatterns = [
    path("", include(router.urls)),
    path("addtocart/", AddToCartView.as_view(), name="addtocart"),
]
