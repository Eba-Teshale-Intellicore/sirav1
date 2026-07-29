from django.urls import include, path
from rest_framework.routers import DefaultRouter

from bookings.views import (CustomerBookingViewSet,ProviderBookingViewSet,AdminBookingViewSet,)

router = DefaultRouter()

router.register(r"customer/bookings",CustomerBookingViewSet,basename="customer-bookings",)
router.register(r"provider/bookings",ProviderBookingViewSet,basename="provider-bookings",)
router.register(r"admin/bookings",AdminBookingViewSet,basename="admin-bookings",)

urlpatterns = [
    path("", include(router.urls)),
]