from django.db import models
from django.utils.text import slugify
from common.models import BaseModel
from cloudinary.models import CloudinaryField

class ServiceCategory(BaseModel):
    name = models.CharField(
        max_length=100,
        unique=True,
        db_index=True,
    )

    slug = models.SlugField(
        unique=True,
        db_index=True,
        blank=True,
    )

    # Example: "plumbing", "cleaning_services", "build"
    icon = models.CharField(
        max_length=100,
        blank=True,
        default="home_repair_service",
    )

    description = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
class Service(BaseModel):
    PRICE_TYPE = (
        ("hourly", "Hourly"),
        ("fixed", "Fixed Price"),
        ("quote", "Request Quote"),
    )


    category = models.ForeignKey(
    ServiceCategory,
    related_name="services",
    on_delete=models.CASCADE
)
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(unique=True,db_index=True, blank=True)
    # image = models.ImageField(upload_to="services/", blank=True, null=True)
    image = CloudinaryField(
        "image",
        blank=True,
        null=True,
    )
    description = models.TextField(blank=True, null=True)
    price_type = models.CharField(max_length=20, choices=PRICE_TYPE, default="hourly")
    starting_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )
    duration = models.PositiveIntegerField(
        help_text="Estimated duration in minutes",
        null=True,
        blank=True
    )
    is_active = models.BooleanField(default=True)

    def save(self,*args,**kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args,**kwargs)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

