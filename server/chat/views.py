from django.db.models import Q
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from .serializers import ConversationSerializer, MessageSerializer
from .models import Conversation, Message

# Create your views here.

class ConversationsViewSet(ModelViewSet):

  serializer_class = ConversationSerializer
  permission_classes = [AllowAny]

  def get_queryset(self):
    user = self.request.user
    return Conversation.objects.filter(
      Q(customer= user) |
      Q(provider = user)
    )

class MessageViewSet(ModelViewSet):

  serializer_class = MessageSerializer
  permission_classes = [AllowAny]

  def get_queryset(self):
    return Message.object.filter(
      conversation_customer = self.request.user
    ) | Message.objects.filter(
      conversation_provider = self.request.user
    )
  def perform_create(self, serializer):
    serializer.save(sender= self.request.user)