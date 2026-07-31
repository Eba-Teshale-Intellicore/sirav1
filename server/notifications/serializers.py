from rest_framework import serializers
from .models import Notification

class NotificationSerializers(serializers.ModelSerializer):

  class Meta:
    model = Notification()
    fields = [
      "id",
      "receiver",
      "booking",
      "title",
      "message",
      "notification_type",
      "is_read",
      "created_at",
    ]