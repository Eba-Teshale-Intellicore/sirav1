from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import ServiceCategory, Service
from .serializers import ServiceCategorySerializer, ServiceSerializer
# Create your views here.

class ServiceCategoryViewSet(ModelViewSet):
  queryset = ServiceCategory.objects.filter(is_active=True)
  serializer_class = ServiceCategorySerializer
  permission_classes = [AllowAny]

class ServiceViewSet(ModelViewSet):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]
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
        provider_profile = self.request.user.provider_profile
        serializer.save(
            provider=provider_profile
        )