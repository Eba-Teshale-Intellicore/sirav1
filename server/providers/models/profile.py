from django.db import models
from common.models import BaseModel
from services.models import Service
# from account.user import User


# Create your models here.

class ProviderProfile(BaseModel):
  # user = models.OneToOneField(User, related_name="provider_profile", on_delete=models.CASCADE)
  profile_image = models.ImageField(upload_to="provides/profile", blank=True, null=True)
  bio= models.TextField(blank=True, null=True)
  phone = models.CharField(max_length=20, blank=True, null=True)
  experience_years = models.PositiveIntegerField(default=0)
  city = models.CharField(max_length=100,db_index=True)
  address = models.CharField(max_length=255,blank=True,null=True)
  latitude = models.DecimalField(max_digits=9,decimal_places=6,blank=True,null=True)
  longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
  is_verified = models.BooleanField(default=True)
  is_available = models.BooleanField(default=True)
  completed_jobs = models.PositiveIntegerField(default=0)
  average_rating = models.DecimalField(
    max_digits=3,
    decimal_places=2,
    default=0.00
)
  languages = models.CharField(max_length=255, blank=True, help_text="Example: Afaan Oromo, Amharic, English")

  # def __str__(self):
  #   return self.user.get_full_name()
  def __str__(self):
    return f"Provider - {self.city}"
