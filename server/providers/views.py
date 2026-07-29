from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import ProviderProfileSerializer, ProviderSkillSerializer

from .models import ProfileSkill, ProviderProfile

# Create your views here.

class ProviderProfileViewSet(ModelViewSet):

  queryset = (
        ProviderProfile.objects
        .filter(is_available=True)
        .prefetch_related("skills")
    )
  serializer_class = ProviderProfileSerializer
  permission_classes = [AllowAny]

class ProviderSkillViewSet(ModelViewSet):

  queryset = ProfileSkill.objects.filter(is_active=True)
  serializer_class = ProviderSkillSerializer
  permission_classes = [AllowAny]