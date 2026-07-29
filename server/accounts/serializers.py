from rest_framework import serializers

from .models.user import User
from .models.customer import CustomerProfile

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = [
      "id",
      "email",
      "full_name",
      "avatar",
      "auth_provider",
      "role",
      "created_at",
    ]

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