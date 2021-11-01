from rest_framework.response import Response
from rest_framework import viewsets
from cart.models import CartProduct
from cart.serializers import CartProductSerializer
from .serializers import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class OrderViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request):
        query = Order.objects.filter(cart__customer=request.user.profile)
        serializers = OrderSerializer(query, many=True)
        all_data = []
        for order in serializers.data:
            cart_product = CartProduct.objects.filter(cart_id=order['cart']['id'])
            cart_product_serializer = CartProductSerializer(cart_product, many=True)
            order['cart_product'] = cart_product_serializer.data
            all_data.append(order)
        return Response(all_data)

    def retrieve(self, request, pk=None):
        try:
            queryset = Order.objects.get(id=pk)
            serializers = OrderSerializer(queryset)
            data = serializers.data
            all_data = []
            cart_product_obj = CartProduct.objects.filter(cart_id=data['cart']['id'])
            cart_product_serializer = CartProductSerializer(cart_product_obj, many=True)
            data['cart_product'] = cart_product_serializer.data
            all_data.append(data)
            message = {"error": False, "data": all_data}
        except Exception as e:
            print(e)
            message = {"error": True, "data": "No data Found for This id"}

        return Response(message)

    def destroy(self, request, pk=None):
        try:
            order_obj = Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            message = {"error": False, "message": "Order deleted", "order id": pk}
        except Exception as e:
            print(e)
            message = {"error": True, "message": "Order Not Found"}
        return Response(message)
