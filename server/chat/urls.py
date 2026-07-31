from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ConversationsViewSet, MessageViewSet

router = DefaultRouter()

router.register(r"conversations", ConversationsViewSet, basename="conversation")
router.register(r"messages", MessageViewSet, basename="message")

urlpatterns = [
  path("", include(router.urls)),
]