from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet

from bookings.models import Booking
from bookings.serializers import BookingSerializer

from rest_framework.decorators import action
from rest_framework.response import Response

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
      # Cancel booking
    @action(detail=True, methods=["patch"])
    def accept(self, request, px=None):
        booking = self.get_object()
        allowed_status = [
            "pending",
            "accepted"
        ]

        if booking.status not in allowed_status:
            return Response(
                {
                    "error":
                    "This booking cannot be cancelled"
                },
                status=400
            )
        booking.status = "cancelled"
        booking.save()
        return Response(
            {
                    "message":
                    "Booking cancelled successfully",

                    "status":
                    booking.status
            },
        )

    # Upcoming bookings

    @action(detail=False,methods=["get"])
    def upcoming(self, request):

        bookings = self.get_queryset().filter(
            status__in=[
                "pending",
                "accepted",
                "started"
            ]
        )


        serializer = self.get_serializer(
            bookings,
            many=True
        )


        return Response(
            serializer.data
        )

    # Completed history

    @action(
        detail=False,
        methods=["get"]
    )
    def history(self, request):

        bookings = self.get_queryset().filter(
            status="completed"
        )


        serializer = self.get_serializer(
            bookings,
            many=True
        )


        return Response(
            serializer.data
        )

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)