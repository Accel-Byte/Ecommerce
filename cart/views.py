from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import views
from .serializers import *


# Create your views here.

class AddToCartView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        incomplete_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()

        try:
            if incomplete_cart:
                this_product_in_cart = incomplete_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    cart_product = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
                    cart_product.quantity += 1
                    cart_product.subtotal += product_obj.selling_price
                    cart_product.save()
                    incomplete_cart.total += product_obj.selling_price
                    incomplete_cart.save()
                else:
                    new_cart_product = CartProduct.objects.create(
                        cart=incomplete_cart,
                        price=product_obj.selling_price,
                        quantity=1,
                        subtotal=product_obj.selling_price
                    )
                    new_cart_product.product.add(product_obj)
                    incomplete_cart.total += product_obj.selling_price
                    incomplete_cart.save()
            else:
                Cart.objects.create(customer=request.user.profile, total=0, complete=False)
                new_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
                new_cart_product = CartProduct.objects.create(
                    cart=new_cart,
                    price=product_obj.selling_price,
                    quantity=1,
                    subtotal=product_obj.selling_price
                )
                new_cart_product.product.add(product_obj)
                new_cart.total += product_obj.selling_price
                new_cart.save()

            message = {'error': False, 'message': "Product added to Cart", "productid": product_id}

        except Exception as e:
            print(e)
            message = {'error': True, 'message': "Product Not added to Cart! Something went Wrong"}

        return Response(message)


class MyCart(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializer(query, many=True)
        all_data = []
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializer = CartProductSerializer(cart_product, many=True)
            cart["cart_product"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)


class UpdateCartProduct(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        cp_obj = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cp_obj.cart

        cp_obj.quantity += 1
        cp_obj.subtotal += cp_obj.price
        cp_obj.save()

        cart_obj.total += cp_obj.price
        cart_obj.save()
        return Response({"message": "CartProduct Add Update", "product": request.data['id']})


class EditCartProduct(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        cp_obj = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cp_obj.cart

        cp_obj.quantity -= 1
        cp_obj.subtotal -= cp_obj.price
        cp_obj.save()

        cart_obj.total -= cp_obj.price
        cart_obj.save()
        if cp_obj.quantity == 0:
            cp_obj.delete()
        return Response({"message": "CartProduct Add Update", "product": request.data['id']})


class DeleteCartProduct(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cp_obj.delete()
        return Response({"message": "CartProduct Deleted", "product": request.data['id']})


class DeleteFullCart(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            card_obj = Cart.objects.get(id=request.data['id'])
            card_obj.delete()
            message = {"message": "Cart Deleted"}
        except Exception as e:
            print(e)
            message = {"message": "Something went wrong"}
        return Response(message)
