from django.urls import path , include
from rest_framework.routers import DefaultRouter

from .views import (
    MyProviderProfileView,
    ProviderAvailabilityViewSet,
    ProviderPortfolioViewSet,
    ProviderProfileViewSet,
    ProviderSkillViewSet,
    ProviderVerificationViewSet,
     BecomeProviderView,
)

router = DefaultRouter()

router.register(r"profiles", ProviderProfileViewSet, basename="provider-profile")
router.register(r"skills", ProviderSkillViewSet , basename="provider-skill")
router.register(r"portfolios", ProviderPortfolioViewSet, basename="provider-portfolio")
router.register(r"availabilities", ProviderAvailabilityViewSet, basename="provider-availability")
router.register(r"verifications", ProviderVerificationViewSet, basename="provider-verification")
urlpatterns = [
    path("", include(router.urls)),

    path(
        "my-profile/",
        MyProviderProfileView.as_view(),
        name="my-provider-profile",
    ),
    path(
        "me/",
        BecomeProviderView.as_view(),
        name="become-provider",
    )
]