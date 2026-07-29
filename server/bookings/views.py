from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .models import Booking
from .serializers import BookingSerializer

# Create your views here.

class BookingViewSet(ModelViewSet):

  serializer_class = BookingSerializer
  permission_classes =  [AllowAny] #[IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Booking.objects.filter(customer = user)