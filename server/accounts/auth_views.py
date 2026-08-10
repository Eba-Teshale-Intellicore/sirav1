import secrets
from urllib.parse import urlencode

from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect
from django.shortcuts import redirect

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .services.google_oauth import (
    build_google_authorization_url,
    exchange_code_for_tokens,
    verify_google_id_token,
)
from django.http import HttpResponse
from urllib.parse import urlencode

User = get_user_model()


class GoogleStartView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        state = secrets.token_urlsafe(32)

        request.session["google_oauth_state"] = state

        google_url = build_google_authorization_url(state)

        return HttpResponseRedirect(google_url)


class GoogleCallbackView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        code = request.GET.get("code")
        state = request.GET.get("state")
        error = request.GET.get("error")

        if error:
            return Response(
                {
                    "detail": "Google authentication was cancelled or failed.",
                    "error": error,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not code:
            return Response(
                {
                    "detail": "Authorization code is missing."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        saved_state = request.session.get(
            "google_oauth_state"
        )

        if not saved_state or state != saved_state:

            return Response(
                {
                    "detail": "Invalid OAuth state."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        del request.session["google_oauth_state"]

        try:

            token_data = exchange_code_for_tokens(code)

            google_id_token = token_data.get("id_token")

            if not google_id_token:
                return Response(
                    {
                        "detail": "Google did not return an ID token."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            google_user = verify_google_id_token(
                google_id_token
            )

        except Exception as error:

            return Response(
                {
                    "detail": "Google authentication failed.",
                    "error": str(error),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        google_sub = google_user.get("sub")
        email = google_user.get("email")
        full_name = google_user.get("name", "")
        avatar = google_user.get("picture")

        if not google_sub or not email:

            return Response(
                {
                    "detail": "Google account information is incomplete."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.filter(
            google_sub=google_sub
        ).first()

        if not user:

            user = User.objects.filter(
                email=email
            ).first()

        if user:

            user.google_sub = google_sub
            user.auth_provider = "google"
            user.full_name = full_name

            if avatar:
                user.avatar = avatar

            user.save(
                update_fields=[
                    "google_sub",
                    "auth_provider",
                    "full_name",
                    "avatar",
                ]
            )

        else:

            user = User.objects.create_user(
                email=email,
                full_name=full_name,
                google_sub=google_sub,
                avatar=avatar,
                auth_provider="google",
                role="customer",
            )

        refresh = RefreshToken.for_user(user)

        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        redirect_url = (
            f"{settings.EXPO_REDIRECT_URI}"
            f"?access_token={access_token}"
            f"&refresh_token={refresh_token}"
        )

        # return HttpResponseRedirect(
        #     redirect_url
        # )
        query = urlencode({
        "access_token": access_token,
        "refresh_token": refresh_token,})

        redirect_url = f"{settings.EXPO_REDIRECT_URI}?{query}"

        return HttpResponse(
            f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Sira Login</title>
            </head>
            <body>
                <p>Completing Sira login...</p>

                <script>
                    window.location.href = {redirect_url!r};
                </script>
            </body>
            </html>
            """
        )