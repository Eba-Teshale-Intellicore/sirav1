from rest_framework import serializers

from .models.user import User
from .models.customer import CustomerProfile

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "avatar",
            "role",
            "auth_provider",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "email",
            "full_name",
            "role",
            "auth_provider",
            "created_at",
        ]

    def update(self, instance, validated_data):

        instance.first_name = validated_data.get(
            "first_name",
            instance.first_name,
        )

        instance.last_name = validated_data.get(
            "last_name",
            instance.last_name,
        )

        instance.full_name = (
            f"{instance.first_name} {instance.last_name}"
        ).strip()

        instance.save()

        return instance

class CustomerProfileSerializer(serializers.ModelSerializer):

  user = UserSerializer(read_only=True)

  class Meta:
    model = CustomerProfile
    fields = [
      "id",
      "user",
      "phone",
      "city",
      "address",
      "latitude",
      "longitude",
      "preferred_language",
      "created_at",
    ]