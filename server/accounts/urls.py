from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    MyUserProfileView,
    CustomerProfileViewSet,
    UserViewSet,
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
]