from rest_framework import serializers
from .models import Booking



class BookingSerializer(serializers.ModelSerializer):

  customer_name = serializers.CharField(source= "customer.full_name", read_only=True)
  provider_name = serializers.CharField(source= "providers.user.full_name", read_only=True)
  service_name = serializers.CharField(source= "service.name", read_only= True)



  class Meta:
    model = Booking
    fields = [
      "id",
      "customer",
      "customer_name",

      "provider",
      "provider_name",

      "service",
      "service_name",

      "address",
      "city",

      "latitude",
      "longitude",

      "booking_date",
      "booking_time",

      "price_type",

      "estimated_price",
      "final_price",

      "status",

      "customer_note",

      "created_at",
    ]

    read_only_fields = [
            "customer",
            "status",
            "final_price",
        ]