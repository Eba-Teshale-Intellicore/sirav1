from rest_framework import serializers
from .models import Message, Conversation

class MessageSerializer(serializers.ModelSerializer):

  class Meta:
    model = Message
    fields = [
      "id",
      "conversation",
      "sender",
      "message",
      "is_read",
      "created_at",
    ]


class ConversationSerializer(serializers.ModelSerializer):
  message = MessageSerializer(many= True, read_only= True)

  class Meta:
    model = Conversation
    fields = [
      "id",
      "booking",
      "customer",
      "provider",
      "message",
      "created_at",
    ]