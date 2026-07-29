from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from accounts.serializers import CustomerProfileSerializer, UserSerializer
from .models.user import User
from .models.customer import CustomerProfile
from rest_framework.permissions import AllowAny
# Create your views here.


class UserViewSet(ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]


class CustomerProfileViewSet(ModelViewSet):
  queryset = CustomerProfile.objects.select_related("user")
  serializer_class = CustomerProfileSerializer
  permission_classes = [AllowAny]