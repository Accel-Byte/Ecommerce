from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=199)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, blank=True, null=True)
    image = models.ImageField(upload_to="products/")
    marcket_price = models.PositiveIntegerField()
    selling_price = models.PositiveIntegerField()
    description = models.TextField()

    def __str__(self):
        return self.title

class Profile(models.Model):
    prouser = models.OneToOneField(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile/")
    def __str__(self):
        return self.prouser.username