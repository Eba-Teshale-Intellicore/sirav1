from rest_framework import serializers
from .models import Service, ServiceCategory


class ServiceSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(
        source="provider.user.full_name",
        read_only=True,
    )

    provider_phone = serializers.CharField(
        source="provider.phone",
        read_only=True,
    )

    provider_city = serializers.CharField(
        source="provider.city",
        read_only=True,
    )

    provider_rating = serializers.DecimalField(
        source="provider.average_rating",
        max_digits=3,
        decimal_places=2,
        read_only=True,
    )

    category = serializers.PrimaryKeyRelatedField(
        queryset=ServiceCategory.objects.all(),
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Service

        fields = [
            "id",
            "provider",
            "provider_name",
            "provider_phone",
            "provider_city",
            "provider_rating",
            "category",
            "category_name",
            "name",
            "slug",
            "image",
            "image_url",
            "description",
            "price_type",
            "starting_price",
            "duration",
            "is_active",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "provider",
            "slug",
            "provider_name",
            "provider_phone",
            "provider_city",
            "provider_rating",
            "category_name",
            "image_url",
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

        read_only_fields = [
            "id",
            "slug",
            "created_at",
            "services",
        ]