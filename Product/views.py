from rest_framework import views, viewsets, generics, mixins
from .models import *
from .serializers import *
from django.contrib.auth.models import User
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
        return Response({"error": True, "message": "A user with that username already exists! Try Another Username"})


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
        serializer = CatagorySerializer(query, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        query = Category.objects.get(id=pk)
        serializer = CatagorySerializer(query)
        data_data = serializer.data
        all_data = []
        category_product = Product.objects.filter(category_id=data_data['id'])
        category_product_serializer = ProductSerializers(category_product, many=True)
        data_data['category_product'] = category_product_serializer.data
        all_data.append(data_data)
        return Response(all_data)
