from django.db.models import Q
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from .serializers import ConversationSerializer
from .models import Conversation

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