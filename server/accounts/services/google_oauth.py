import requests

from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests


GOOGLE_AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"


def build_google_authorization_url(state):
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "state": state,
        "access_type": "offline",
        "prompt": "select_account",
    }

    response = requests.Request(
        "GET",
        GOOGLE_AUTHORIZATION_URL,
        params=params,
    ).prepare()

    return response.url


def exchange_code_for_tokens(code):
    response = requests.post(
        GOOGLE_TOKEN_URL,
        data={
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        },
        timeout=15,
    )

    response.raise_for_status()

    return response.json()


def verify_google_id_token(id_token_value):
    return id_token.verify_oauth2_token(
        id_token_value,
        google_requests.Request(),
        settings.GOOGLE_CLIENT_ID,
    )