from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet

from bookings.models import Booking
from bookings.serializers import BookingSerializer


class CustomerBookingViewSet(ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [AllowAny] #[IsAuthenticated]

    def get_queryset(self):
        return (
            Booking.objects
            .filter(customer=self.request.user)
            .select_related(
                "customer",
                "provider__user",
                "service",
            )
        )

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)