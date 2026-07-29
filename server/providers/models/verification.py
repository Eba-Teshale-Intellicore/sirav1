from common.models import BaseModel
from django.db import models

from .profile import ProviderProfile

class ProviderVerification(BaseModel):

    STATUS = [
        ("pending","Pending"),
        ("approved","Approved"),
        ("rejected","Rejected"),
    ]

    provider = models.OneToOneField(
        ProviderProfile,
        related_name="verification",
        on_delete=models.CASCADE
    )

    government_id = models.ImageField(
        upload_to="providers/verification/"
    )

    selfie = models.ImageField(
        upload_to="providers/verification/"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="pending"
    )

    rejection_reason = models.TextField(
        blank=True
    )

    reviewed_at = models.DateTimeField(
        blank=True,
        null=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.provider} - {self.status}"