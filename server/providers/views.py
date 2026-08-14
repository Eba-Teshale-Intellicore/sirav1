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




class BecomeProviderView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        # Already a provider
        if hasattr(user, "provider_profile"):
            serializer = ProviderProfileSerializer(
                user.provider_profile
            )

            return Response(
                {
                    "message": "You are already a provider.",
                    "user": {
                        "id": str(user.id),
                        "role": user.role,
                    },
                    "provider": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        serializer = ProviderProfileSerializer(
            data=request.data
        )

        if serializer.is_valid():

            provider = serializer.save(user=user)

            # Change role
            user.role = "provider"
            user.save(update_fields=["role"])

            return Response(
                {
                    "message": "You are now a provider.",
                    "user": {
                        "id": str(user.id),
                        "role": user.role,
                    },
                    "provider": ProviderProfileSerializer(
                        provider
                    ).data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )