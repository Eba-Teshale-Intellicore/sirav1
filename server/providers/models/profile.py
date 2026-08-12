from django.db import models

from common.models import BaseModel
from cloudinary.models import CloudinaryField
from accounts.models import User



class ProviderProfile(BaseModel):

    user = models.OneToOneField(
        User,
        related_name="provider_profile",
        on_delete=models.CASCADE,
    )

    # -------------------------
    # Provider information
    # -------------------------

    profile_image = CloudinaryField(
        "profile_image",
        blank=True,
        null=True,
    )

    bio = models.TextField(
        blank=True,
        null=True,
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
    )

    experience_years = models.PositiveIntegerField(
        default=0,
    )

    city = models.CharField(
        max_length=100,
        db_index=True,
        blank=True,
        null=True,
    )

    address = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )

    languages = models.CharField(
        max_length=255,
        blank=True,
        help_text="Example: Afaan Oromo, Amharic, English",
    )

    # -------------------------
    # Location
    # -------------------------

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True,
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True,
    )

    # -------------------------
    # System-managed
    # -------------------------

    is_verified = models.BooleanField(
        default=False,
    )

    is_available = models.BooleanField(
        default=True,
    )

    completed_jobs = models.PositiveIntegerField(
        default=0,
    )

    # -------------------------
    # Calculated from reviews
    # -------------------------

    average_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.00,
    )

    def __str__(self):
        return f"{self.user.full_name} - {self.city}"