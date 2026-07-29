from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.viewsets import ModelViewSet

from bookings.models import Booking
from bookings.serializers import BookingSerializer


class AdminBookingViewSet(ModelViewSet):
    queryset = (
        Booking.objects
        .select_related(
            "customer",
            "provider__user",
            "service",
        )
    )

    serializer_class = BookingSerializer
    permission_classes =  [AllowAny] # [IsAdminUser]