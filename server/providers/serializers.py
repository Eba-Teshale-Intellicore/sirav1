from rest_framework import serializers

from .models.verification import ProviderVerification

from .models.portfolio import ProviderPortfolio
from .models.availability import ProviderAvailability

from .models.profile import ProviderProfile
from .models.skill import ProfileSkill

class ProviderSkillSerializer(serializers.ModelSerializer):

  service_name = serializers.CharField(source= "service.name", read_only= True)

  class Meta:
    model = ProfileSkill
    fields = [
      "id",
      "service",
      "service_name",
      "experience_years",
      "price",
      "description",
      "is_active",
      "created_at",
    ]



class ProviderPortfolioSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProviderPortfolio
    fields = [
      "id",
      "provider",
      "title",
      "image",
      "description",
      "completed_date",
      "is_featured",
      "created_at",
    ]

class ProviderAvailabilitySerializer(serializers.ModelSerializer):
  class Meta:
    model = ProviderAvailability
    fields = [
      "id",
      "provider",
      "day",
      "start_time",
      "end_time",
      "is_available",
      "created_at",
    ]
  def validate(self, attrs):
    if attrs["start_time"] >= attrs["end_time"]:
        raise serializers.ValidationError(
            "End time must be after start time."
        )
    return attrs


class ProviderVerificationSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProviderVerification
    fields = [
      "id",
      "provider",
      "government_id",
      "selfie",
      "status",
      "rejection_reason",
      "reviewed_at",
      "created_at",
    ]

class ProviderProfileSerializer(serializers.ModelSerializer):
    skills = ProviderSkillSerializer(many=True, read_only=True)
    portfolios = ProviderPortfolioSerializer(many=True, read_only=True)
    availability = ProviderAvailabilitySerializer(many=True, read_only=True)
    verification = ProviderVerificationSerializer(read_only=True)

    class Meta:
        model = ProviderProfile
        fields = [
            "id",
            "user",
            "profile_image",
            "bio",
            "phone",
            "experience_years",
            "city",
            "address",
            "latitude",
            "longitude",
            "is_verified",
            "is_available",
            "completed_jobs",
            "average_rating",
            "language",
            "skills",
            "portfolios",
            "availability",
            "verification",
            "created_at",
        ]