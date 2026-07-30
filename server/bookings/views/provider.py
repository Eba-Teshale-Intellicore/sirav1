from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

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

    @action(detail=True, methods=["patch"])
    def accept(self, request, px=None):
        booking = self.get_object()
        if booking.status != "pending":
            return Response(
                {
                    "error":
                    "only pending bookings can be accepted"
                },
                status=400
            )
        booking.status = "accepted"
        booking.save()
        return Response(
            {
                 "message":
                 "Booking accepted accepted",

                 "status":
                 booking.status
            },
        )

    @action(detail=True, methods=["patch"])
    def accept(self, request, px=None):
        booking =self.get_object()

        if booking.status != "pending":
            return Response(
                {
                    "error":
                    "only pending"
                },
                status=400
            )
        booking.status = "rejected"
        booking.save()
        return Response(
            {
                "message":
                "Booking Rejected",

                "status":
                booking.status
            }
        )
    @action(detail=True, methods=["patch"])
    def accept(self, request, px=None):
        booking =self.get_object()

        if booking.status != "pending":
            return Response(
                {
                    "error":
                    "only pending"
                },
                status=400
            )
        booking.status = "started"
        booking.save()
        return Response(
            {
                "message":
                "Job started",

                "status":
                booking.status
            }
        )
    @action(detail=True, methods=["patch"])
    def accept(self, request, px=None):
        booking =self.get_object()

        if booking.status != "pending":
            return Response(
                {
                    "error":
                    "only pending"
                },
                status=400
            )
        booking.status = "completed"
        booking.save()
        return Response(
            {
                "message":
                "Job completed",

                "status":
                booking.status
            }
        )