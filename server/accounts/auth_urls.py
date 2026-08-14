from django.urls import path

from .auth_views import (
    GoogleStartView,
    GoogleCallbackView,
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


]