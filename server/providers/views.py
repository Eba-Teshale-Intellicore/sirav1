from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status

from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
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





from .models import ProviderProfile
class BecomeProviderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        provider, created = ProviderProfile.objects.get_or_create(
            user=user
        )

        provider.bio = request.data.get("bio", "")
        provider.phone = request.data.get("phone", "")
        provider.city = request.data.get("city", "")
        provider.address = request.data.get("address", "")
        provider.experience_years = request.data.get(
            "experience_years", 0
        )
        provider.language = request.data.get("languages", "")

        provider.save()

        user.role = "provider"
        user.save(update_fields=["role"])

        return Response(
            {
                "message": "You are now a Sira provider.",
                "user": {
                    "id": str(user.id),
                    "role": user.role,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                },
                "provider": {
                    "id": str(provider.id),
                    "bio": provider.bio,
                    "phone": provider.phone,
                    "city": provider.city,
                    "address": provider.address,
                    "experience_years": provider.experience_years,
                    "language": provider.language,
                },
            },
            status=status.HTTP_200_OK,
        )