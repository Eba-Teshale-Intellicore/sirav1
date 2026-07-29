
from common.models import BaseModel
from django.db import models

from .profile import ProviderProfile


class ProviderPortfolio(BaseModel):

  provider = models.ForeignKey(ProviderProfile,related_name="portfolios",on_delete=models.CASCADE)
  title = models.CharField(max_length=150)
  image = models.ImageField(upload_to="providers/portfolio/")
  description = models.TextField(blank=True)
  completed_date = models.DateField(blank=True, null=True)
  is_featured = models.BooleanField(default=False)

  class Meta:
    ordering = ["-completed_date"]

  def __str__(self):
     return self.title