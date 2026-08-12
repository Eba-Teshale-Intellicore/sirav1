from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from accounts.serializers import CustomerProfileSerializer, UserSerializer
from .models.user import User
from .models.customer import CustomerProfile


class MyUserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


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
    permission_classes = [IsAuthenticated]