from django.db import models
from common.models import BaseModel
from .user import User


class CustomerProfile(BaseModel):
  user = models.OneToOneField(User, related_name="customer_profile",on_delete=models.CASCADE)
  phone = models.CharField(max_length=20, blank=True)
  city = models.CharField(max_length=100, blank=True)
  address = models.CharField(max_length=255,blank=True,null=True)
  latitude = models.DecimalField(max_digits=9,decimal_places=6,blank=True,null=True)
  longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
  preferred_language = models.CharField(max_length=50, default="English")
  class Meta:
    ordering = ["user__full_name"]

  def __str__(self):
    return self.user.full_name