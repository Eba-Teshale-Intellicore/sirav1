from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    MyUserProfileView,
    CustomerProfileViewSet,
    UserViewSet,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
router = DefaultRouter()

router.register(r"users", UserViewSet, basename="users")
router.register(r"customers", CustomerProfileViewSet, basename="customers")

urlpatterns = [
    path(
        "profile/",
        MyUserProfileView.as_view(),
        name="my-user-profile",
    ),

    path(
        "",
        include(router.urls),
    ),
        path(
    "auth/token/refresh/",
    TokenRefreshView.as_view(),
    name="token_refresh",
),
]