from google.oauth2 import id_token
from google.auth.transport import requests

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .models.user import User


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        google_token = request.data.get("id_token")

        if not google_token:
            return Response(
                {"detail": "id_token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            google_user = id_token.verify_oauth2_token(
                google_token,
                requests.Request(),
                settings.GOOGLE_WEB_CLIENT_ID,
            )

        except ValueError:
            return Response(
                {"detail": "Invalid Google ID token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        google_sub = google_user.get("sub")
        email = google_user.get("email")
        name = google_user.get("name", "")
        picture = google_user.get("picture")

        if not google_sub or not email:
            return Response(
                {"detail": "Google account information is incomplete."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user, created = User.objects.get_or_create(
            google_sub=google_sub,
            defaults={
                "email": email,
                "full_name": name,
                "avatar": picture,
                "auth_provider": "google",
                "role": "customer",
            },
        )

        if not created:
            changed = False

            if user.email != email:
                user.email = email
                changed = True

            if user.full_name != name:
                user.full_name = name
                changed = True

            if picture and user.avatar != picture:
                user.avatar = picture
                changed = True

            if changed:
                user.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "id": str(user.id),
                "email": user.email,
                "full_name": user.full_name,
                "avatar": user.avatar,
                "role": user.role,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "is_new_user": created,
        })