from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id",'username','password','first_name','last_name','email')
        extra_kwargs = {'password':{'write_only':True,'required':True}}
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        Profile.objects.create(prouser=user)
        return user

class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ['prouser']

    def validate(self,attrs):
        attrs['prouser'] = self.context['request'].user
        return attrs

    def to_representation(self,instance):
        response = super().to_representation(instance)
        response['prouser'] = UserSerializer(instance.prouser).data
        return response