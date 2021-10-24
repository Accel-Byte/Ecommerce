from django.contrib import admin
from .models import *


class ProductAdmin(admin.ModelAdmin):
    list_display=("id","title","category","selling_price","date")
admin.site.register(Product,ProductAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display=("id",'title','date')
admin.site.register(Category,CategoryAdmin)