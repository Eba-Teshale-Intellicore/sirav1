from django.db import models
from common.models import BaseModel
from bookings.models import Booking
from accounts.models import User
from providers.models.profile import ProviderProfile

# Create your models here.


class Conversation(BaseModel):

  booking = models.OneToOneField(Booking , related_name="conversation", on_delete=models.CASCADE)
  customer = models.ForeignKey(User, related_name="conversation", on_delete=models.CASCADE)
  provider = models.ForeignKey(ProviderProfile, related_name="conversation", on_delete=models.CASCADE)

  class Meta:
    ordering = ["-created_at"]

  def __str__(self):
    return str(self.booking)

class Message(BaseModel):

  conversation = models.ForeignKey(Conversation, related_name="messages", on_delete=models.CASCADE)
  sender = models.ForeignKey(User, related_name="messages", on_delete=models.CASCADE)
  message = models.TextField()
  is_read = models.BooleanField(default=False)

  class Meta:
    ordering = ["-created_at"]

  def __str__(self):
    return f"{self.sender}"