from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet

from bookings.models import Booking
from bookings.serializers import BookingSerializer


class ProviderBookingViewSet(ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [AllowAny] #[IsAuthenticated]


    def get_queryset(self):
        return (
            Booking.objects
            .filter(provider__user=self.request.user)
            .select_related(
                "customer",
                "provider__user",
                "service",
            )
        )