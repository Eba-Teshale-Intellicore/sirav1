from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models.verification import ProviderVerification

from .models.availability import ProviderAvailability
from .models.portfolio import ProviderPortfolio

from .models.profile import ProviderProfile
from .models.skill import ProfileSkill

from .serializers import ProviderAvailabilitySerializer, ProviderPortfolioSerializer, ProviderProfileSerializer, ProviderSkillSerializer, ProviderVerificationSerializer

# Create your views here.

class ProviderProfileViewSet(ModelViewSet):

    serializer_class = ProviderProfileSerializer
    permission_classes = [IsAuthenticated,]
    def get_queryset(self):
        return (
            ProviderProfile.objects
            .filter(user=self.request.user)
            .select_related("user")
            .prefetch_related(
                "skills",
                "portfolios",
                "availability",
            )
        )
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )
class MyProviderProfileView(RetrieveUpdateAPIView):

    serializer_class = ProviderProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        profile, created = ProviderProfile.objects.get_or_create(
            user=self.request.user
        )

        return profile
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

