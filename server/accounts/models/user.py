from django.db import models
from common.models import BaseModel
from django.contrib.auth.models import AbstractUser

from accounts.managers import UserManager

class User(BaseModel, AbstractUser):
  ROLE_CHOICES = (
        ("customer", "Customer"),
        ("provider", "Provider"),
        ("admin", "Admin"),
    )
  username = None
  first_name = None
  last_name = None
  email = models.EmailField(unique=True) 
  full_name = models.CharField(max_length=100)
  avatar = models.URLField(blank=True, null=True)
  auth_provider = models.CharField(max_length=10, default="google")
  role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="customer" )

  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = []
  objects = UserManager()

  class Meta:
    ordering = ["full_name"]

  def __str__(self):
    return self.email