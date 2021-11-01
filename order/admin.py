from django.contrib import admin
from .models import *


# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "date")


admin.site.register(Order, OrderAdmin)
