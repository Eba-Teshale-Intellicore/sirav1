from rest_framework import serializers
from .models import Service, ServiceCategory

class ServiceSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(
        read_only=True,
        slug_field="name"
    )

    class Meta:
        model = Service
        fields = [
            "id",
            "category",
            "name",
            "slug",
            "image",
            "description",
            "price_type",
            "starting_price",
            "duration",
            "is_active",
            "created_at",
        ]


class ServiceCategorySerializer(serializers.ModelSerializer):
  services = ServiceSerializer(many=True, read_only=True)

  class Meta:
    model = ServiceCategory
    fields = [
      "id",
      "name",
      "slug",
      "icon",
      "description",
      "is_active",
      "created_at",
      "services",
    ]