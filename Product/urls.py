from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('category', CategoryViewSet, basename="CategoryViewSet")

urlpatterns = [
    path("", include(router.urls)),
    path("product/", ProductView.as_view(), name="product"),
    path("product/<int:id>/", ProductView.as_view(), name="productDetail"),
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
