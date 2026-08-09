from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from accounts.serializers import CustomerProfileSerializer, UserSerializer
from .models.user import User
from .models.customer import CustomerProfile
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.


class UserViewSet(ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(
            id=self.request.user.id
        )


class CustomerProfileViewSet(ModelViewSet):
  queryset = CustomerProfile.objects.select_related("user")
  serializer_class = CustomerProfileSerializer
  permission_classes = [AllowAny]