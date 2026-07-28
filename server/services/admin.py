from django.contrib import admin

from .models import (ServiceCategory, Service)

# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
  list_display= ('name', 'description','is_active', 'created_at',)
  list_filter= ('name',)
  search_fields =('name',)
  prepopulated_fields = {
    "slug": ("name",)
    }

class ServicesAdmin(admin.ModelAdmin):
  list_display = ('name', 'category', 'description', 'price_type', 'starting_price', 'duration', 'is_active', 'created_at',)
  list_filter = ('name', 'category','price_type', 'starting_price',)
  search_fields = (
    'name',
    'category__name',
    'price_type',
    )
  prepopulated_fields = {
    "slug": ("name",)
    }

admin.site.register(ServiceCategory, CategoryAdmin)
admin.site.register(Service, ServicesAdmin)