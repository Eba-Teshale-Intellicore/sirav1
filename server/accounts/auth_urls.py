from django.urls import path

from .auth_views import (
    GoogleStartView,
    GoogleCallbackView,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [

    path(
        "google/start/",
        GoogleStartView.as_view(),
        name="google-start",
    ),

    path(
        "google/callback/",
        GoogleCallbackView.as_view(),
        name="google-callback",
    ),
    path(
    "auth/token/refresh/",
    TokenRefreshView.as_view(),
    name="token_refresh",
),

]