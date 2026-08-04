from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from .models import ServiceCategory, Service
from .serializers import ServiceCategorySerializer, ServiceSerializer
# Create your views here.


class ServiceCategoryViewSet(ModelViewSet):
  queryset = ServiceCategory.objects.filter(is_active=True)
  serializer_class = ServiceCategorySerializer
  permission_classes = [AllowAny]

class ServiceViewSet(ModelViewSet):
  queryset = Service.objects.all()
  serializer_class = ServiceSerializer
  permission_classes = [AllowAny]
