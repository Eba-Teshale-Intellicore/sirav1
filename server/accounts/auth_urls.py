from django.urls import path

from .auth_views import GoogleLoginView

urlpatterns = [
    path("google/", GoogleLoginView.as_view(), name="google-login"),
]