from rest_framework import serializers

from .models import ProfileSkill, ProviderProfile

class ProviderSkillSerializer(serializers.ModelSerializer):

  service_name = serializers.CharField(source= "service.name", read_only= True)

  class Meta:
    model = ProfileSkill
    fields = [
      "id",
      "service",
      "service_name",
      "experience_year",
      "price",
      "description",
      "is_active",
      "created_at",
    ]

class ProviderProfileSerializer(serializers.ModelSerializer):

  skills = ProviderSkillSerializer(many=True, read_only=True)

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
      "created_at",
    ]
    read_only_fields = [
            "is_verified",
            "completed_jobs",
            "average_rating",
        ]