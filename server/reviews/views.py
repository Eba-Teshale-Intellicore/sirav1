from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Review
from .serializers import ReviewsSerializers
from rest_framework.permissions import AllowAny

# Create your views here.
class ReviewViewSet(ModelViewSet):

  queryset = Review.objects.all()
  serializer_class = ReviewsSerializers
  permission_classes = [AllowAny]

  def get_queryset(self):
    return Review.objects.filter(
      is_visible=True
      )
  def perform_create(self, serializer):

      booking = serializer.validated_data["booking"]

      # Only completed jobs

      if booking.status != "completed":

          raise Exception(
              "Review only allowed after completed booking"
          )
      
      serializer.save(
          customer=self.request.user,
          provider=booking.provider
      )