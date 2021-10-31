from django.contrib import admin
from .models import *

# Register your models here.


class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "total", "complete", "date")


admin.site.register(Cart, CartAdmin)


class CartProductAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "price", "quantity", "subtotal")


admin.site.register(CartProduct)
