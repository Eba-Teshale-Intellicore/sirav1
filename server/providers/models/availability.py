from common.models import BaseModel
from django.db import models

from .profile import ProviderProfile


class ProviderAvailability(BaseModel):
  DAYS = [
        ("monday","Monday"),
        ("tuesday","Tuesday"),
        ("wednesday","Wednesday"),
        ("thursday","Thursday"),
        ("friday","Friday"),
        ("saturday","Saturday"),
        ("sunday","Sunday"),
    ]

  provider = models.ForeignKey(ProviderProfile,related_name="availability", on_delete=models.CASCADE)
  day = models.CharField(max_length=10, choices=DAYS)

  start_time = models.TimeField()
  end_time = models.TimeField()
  is_available = models.BooleanField(default=True)

  class Meta:
    unique_together = (
      "provider",
      "day",
      )

  def __str__(self):
     return f"{self.provider} - {self.day}"

