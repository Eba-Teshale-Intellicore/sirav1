from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from .models.verification import ProviderVerification

from .models.availability import ProviderAvailability
from .models.portfolio import ProviderPortfolio

from .models.profile import ProviderProfile
from .models.skill import ProfileSkill

from .serializers import ProviderAvailabilitySerializer, ProviderPortfolioSerializer, ProviderProfileSerializer, ProviderSkillSerializer, ProviderVerificationSerializer

# Create your views here.

class ProviderProfileViewSet(ModelViewSet):

  queryset = (
    ProviderProfile.objects
    .filter(is_available=True)
    .prefetch_related(
        "skills",
        "portfolios",
        "availability",
    )
    .select_related("verification")
)
  serializer_class = ProviderProfileSerializer
  permission_classes = [AllowAny]

class ProviderSkillViewSet(ModelViewSet):

  queryset = ProfileSkill.objects.filter(is_active=True)
  serializer_class = ProviderSkillSerializer
  permission_classes = [AllowAny]

class ProviderPortfolioViewSet(ModelViewSet):

  queryset = ProviderPortfolio.objects.order_by("-completed_date")
  serializer_class = ProviderPortfolioSerializer
  permission_classes = [AllowAny]

class ProviderAvailabilityViewSet(ModelViewSet):

  queryset = ProviderAvailability.objects.all()
  serializer_class = ProviderAvailabilitySerializer
  permission_classes = [AllowAny]

class ProviderVerificationViewSet(ModelViewSet):

  queryset = ProviderVerification.objects.all()
  serializer_class = ProviderVerificationSerializer
  permission_classes = [AllowAny]

