from django.db import models
from common.models import BaseModel
from accounts.models.user import User
from providers.models.profile import ProviderProfile
from services.models import Service

# Create your models here.


class Booking(BaseModel):
  STATUS_CHOICES = (
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("started", "Started"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
        ("rejected", "Rejected"),
    )
  
  customer = models.ForeignKey(User, related_name="customer_booking", on_delete=models.CASCADE)
  provider = models.ForeignKey(ProviderProfile, related_name="bookings", on_delete=models.CASCADE)
  service = models.ForeignKey(Service, related_name="bookings", on_delete=models.CASCADE)

  # Service location
  address = models.CharField(max_length=100)
  city = models.CharField(max_length=100, db_index=True)
  latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
  longitude= models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

  # Schedule
  booking_date = models.DateField()
  booking_time = models.TimeField()

  #Pricing
  PRICE_TYPE = (
        ("hourly", "Hourly"),
        ("fixed", "Fixed"),
        ("quote", "Quote"),
    )

  price_type = models.CharField(max_length=10, choices=PRICE_TYPE, default="quote")
  estimated_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
  final_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
  status = models.CharField(max_length=20,choices=STATUS_CHOICES,default="pending",)
  customer_note = models.TextField(blank=True)

  class Meta:
    ordering = [
      "-created_at"
    ]
  def __str__(self):
    return f"{self.customer} - {self.service}"