import json

from django.http import JsonResponse
from rest_framework import views, viewsets, generics, mixins
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class ProductView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by("-id")
    serializer_class = ProductSerializers
    lookup_field = "id"

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)


class RegisterView(views.APIView):
    def post(self, request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error": False, "message": f"user is created for '{serializers.data['username']}' ",
                             "data": serializers.data})
        return Response({"error": True, "message": serializers.errors, "status": status.HTTP_400_BAD_REQUEST})


class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            query = Profile.objects.get(user=request.user)
            serializer = ProfileSerializers(query)
            response_message = {"error": False, "data": serializer.data}
        except Exception as e:
            print(e)
            response_message = {"error": True, "message": "Something went Wrong"}
        return Response(response_message)


class CategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        query = Category.objects.all()
        serializer = CategorySerializer(query, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        query = Category.objects.get(id=pk)
        serializer = CategorySerializer(query)
        data_data = serializer.data
        all_data = []
        category_product = Product.objects.filter(category_id=data_data['id'])
        category_product_serializer = ProductSerializers(category_product, many=True)
        data_data['category_product'] = category_product_serializer.data
        all_data.append(data_data)
        return Response(all_data)


class UpdateUser(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user = request.user
            data = request.data
            user_obj = User.objects.get(username=user)
            user_obj.first_name = data["first_name"]
            user_obj.last_name = data["last_name"]
            user_obj.email = data["email"]
            user_obj.save()
            response_data = {"error": False, "message": "User Data is Updated"}
        except Exception as e:
            print(e)
            response_data = {"error": True, "message": "User Data is not Update Try Again!!!"}
        return Response(response_data)


class UpdateProfile(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user = request.user
            query = Profile.objects.get(user=user)
            data = request.data
            serializers = ProfileSerializers(query, data=data, context={"request": request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            return_res = {"message": "Profile is Updated"}
        except Exception as e:
            print(e)
            return_res = {"message": "Something went Wrong Try Again!!!"}
        return Response(return_res)
