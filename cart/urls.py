from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
router.register('cart', MyCart, basename="MyCart")

urlpatterns = [
    path("", include(router.urls)),
    path("addToCart/", AddToCartView.as_view(), name="addToCart"),
    path("updateCartProduct/", UpdateCartProduct.as_view(), name="updateCartProduct"),
    path("editCartProduct/", EditCartProduct.as_view(), name="editCartProduct"),
    path("deleteCartProduct/", DeleteCartProduct.as_view(), name="deleteCartProduct"),
    path("deleteFullCart/", DeleteFullCart.as_view(), name="deleteFullCart"),
]
