from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import NotificationSerializers
from .models import Notification

# Create your views here.


class NotificationViewSet(ModelViewSet):
  serializer_class = NotificationSerializers
  permission_classes = [AllowAny]

  def get_queryset(self):
    return Notification.objects.filter(
      receiver = self.request.user
    )

  @action(detail=True, methods=["patch"])
  def read(self, request, pk=None):

    notification = self.get_object()

    notification.is_read =True
    notification.save()

    return Response(
            {"message": "Notification marked as read."}
        )