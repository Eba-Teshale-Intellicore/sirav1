from rest_framework import serializers
from .models import Service, ServiceCategory

class ServiceSerializer(serializers.ModelSerializer):

    category = serializers.PrimaryKeyRelatedField(
        queryset=ServiceCategory.objects.all(),
        write_only=True,
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Service
        fields = [
            "id",
            "category",          # POST uses UUID
            "category_name",     # GET returns name
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