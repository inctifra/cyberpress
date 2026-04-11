from django.contrib import admin

from apps.core._admin import _admin_site

from .models import Category


@admin.register(Category, site=_admin_site)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    search_fields = ("name",)

