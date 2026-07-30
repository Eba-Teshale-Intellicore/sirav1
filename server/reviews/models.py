from django.db import models
from common.models import BaseModel
from bookings.models import Booking
from accounts.models.user import User
from providers.models.profile import ProviderProfile


# Create your models here.
class Review(BaseModel):
  RATING_CHOICES = (
        (1, "1 Star"),
        (2, "2 Stars"),
        (3, "3 Stars"),
        (4, "4 Stars"),
        (5, "5 Stars"),
    )

  booking = models.OneToOneField(Booking, related_name="review", on_delete=models.CASCADE)
  customer = models.ForeignKey(User, related_name="reviews_given", on_delete=models.CASCADE)
  provider = models.ForeignKey(ProviderProfile,related_name="reviews",on_delete=models.CASCADE )
  rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES)
  comment = models.TextField(blank=True)
  is_visible = models.BooleanField(default=True)

  class Meta:
    ordering = [
      "-created_at"
    ]

  def __str__(self):
    return f"{self.provider} - {self.rating}"