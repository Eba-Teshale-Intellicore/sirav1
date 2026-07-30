from rest_framework import serializers
from .models import Review

class ReviewsSerializers(serializers.ModelSerializer):
  customer_name = serializers.CharField(source= "customer.full_name", read_only=True)
  provider_name = serializers.CharField(source= "providers.user.full_name", read_only= True)


  class Meta:
    model = Review
    fields = [
      "id",

      "booking",
      "customer",
      "customer_name",

      "provider",
      "provider_name"

      "rating",

      "comment",

      "is_visible",
      "created_at",
    ]
    read_only_fields = [
            "customer",
            "provider",
        ]