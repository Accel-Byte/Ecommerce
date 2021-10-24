from django.urls import path,include

from .views import *

urlpatterns = [
    path("product/",ProductView.as_view(),name="product"),
    path("product/<int:id>/",ProductView.as_view(),name="productdetail"),
    path("register/",RegisterView.as_view(),name="register"),
    path("profile/",ProfileView.as_view(),name="profile"),
]