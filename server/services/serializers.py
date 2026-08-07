from rest_framework import serializers
from .models import Service, ServiceCategory


class ServiceSerializer(serializers.ModelSerializer):

    category = serializers.PrimaryKeyRelatedField(
        queryset=ServiceCategory.objects.all(),
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    image = serializers.SerializerMethodField()

    class Meta:
        model = Service

        fields = [
            "id",
            "category",
            "category_name",
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

    def get_image_url(self, obj):
        if not obj.image:
            return None
        try:
            return obj.image.url
        except Exception:
            return None

class ServiceCategorySerializer(serializers.ModelSerializer):

    services = ServiceSerializer(
        many=True,
        read_only=True,
    )

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