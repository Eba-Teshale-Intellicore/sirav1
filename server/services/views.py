from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated

from .models import ServiceCategory, Service
from .serializers import ServiceCategorySerializer, ServiceSerializer
from rest_framework.exceptions import ValidationError, PermissionDenied
# Create your views here.

class ServiceCategoryViewSet(ModelViewSet):
  queryset = ServiceCategory.objects.filter(is_active=True)
  serializer_class = ServiceCategorySerializer
  permission_classes = [AllowAny]
class IsProvider(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "provider"
        )
class ServiceViewSet(ModelViewSet):
    serializer_class = ServiceSerializer
    permission_classes = [
    IsAuthenticated,
    IsProvider,
]
    def get_permissions(self):

        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [
            IsAuthenticated(),
            IsProvider(),
        ]
    def get_queryset(self):
        return (
            Service.objects
            .select_related(
                "provider__user",
                "category",
            )
            # .filter(is_active=True)
        )
    def perform_create(self, serializer):

        provider = getattr(
            self.request.user,
            "provider_profile",
            None
        )

        if not provider: 
            raise ValidationError(
                "Please complete your provider profile first."
            )

        serializer.save(
            provider=provider
        )
    def perform_update(self, serializer):

        service = self.get_object()

        if service.provider.user != self.request.user:
            raise PermissionDenied(
                "You can only edit your own services."
            )

        serializer.save()
    def perform_destroy(self, instance):

        if instance.provider.user != self.request.user:
            raise PermissionDenied(
                "You can only delete your own services."
            )

        instance.delete()