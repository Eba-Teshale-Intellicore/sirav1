from django.db import models
from common.models import BaseModel
from accounts.models import User
from bookings.models import Booking

# Create your models here.



class Notification(BaseModel):

  TYPE_CHOICES = (
      ("booking_request", "Booking Request"),
      ("booking_accepted", "Booking Accepted"),
      ("booking_rejected", "Booking Rejected"),
      ("booking_started", "Booking Started"),
      ("booking_completed", "Booking Completed"),
      ("booking_cancelled", "Booking Cancelled"),
      ("review", "Review"),
      ("system", "System"),
  )
  receiver = models.ForeignKey(User, related_name="notifications", on_delete=models.CASCADE)
  booking = models.ForeignKey(Booking, related_name="notifications", on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  message = models.TextField()
  notification_type = models.CharField(max_length=30, choices=TYPE_CHOICES)
  is_read = models.BooleanField(default=True)

  class Meta:
    ordering = ["-created_at"]

  def __str__(self):
    return self.title

  