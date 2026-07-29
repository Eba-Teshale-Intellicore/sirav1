from django.contrib import admin

from .models import ProfileSkill, ProviderProfile

# Register your models here.
admin.site.register(ProviderProfile)
admin.site.register(ProfileSkill)
