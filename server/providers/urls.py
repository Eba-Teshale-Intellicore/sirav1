from django.urls import path , include
from rest_framework.routers import DefaultRouter

from .views import ProviderProfileViewSet, ProviderSkillViewSet


router = DefaultRouter()

router.register(r"profiles", ProviderProfileViewSet, basename="provider-profile")
router.register(r"skill", ProviderSkillViewSet , basename="provider-skill")

urlpatterns = [
  path("", include(router.urls))
]