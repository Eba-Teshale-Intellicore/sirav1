from django.db import models
from common.models import BaseModel
from .profile import ProviderProfile
from services.models import Service
# from account.user import User

class ProfileSkill(BaseModel):

  provider = models.ForeignKey(ProviderProfile, related_name="skills", on_delete=models.CASCADE)
  service = models.ForeignKey(Service , related_name="providers", on_delete=models.CASCADE)
  experience_years = models.PositiveIntegerField(default=0)
  price = models.DecimalField(max_digits=10,decimal_places=2,blank=True,null=True)
  description =models.TextField(blank=True, null=True)
  is_active = models.BooleanField(default=True)

  class Meta:
    unique_together = (
          "provider",
          "service",
      )
  def __str__(self):
    return f"{self.provider} - {self.service}"