from django.contrib import admin

from .models.profile import ProviderProfile
from .models.skill import ProfileSkill

# Register your models here.
admin.site.register(ProviderProfile)
admin.site.register(ProfileSkill)
