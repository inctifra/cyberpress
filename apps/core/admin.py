from django.contrib import admin

from .models import QRCode
from ._admin import _admin_site


@admin.register(QRCode, site=_admin_site)
class QRCodeAdmin(admin.ModelAdmin):
    list_display = ("file", "created_at", "updated_at", "is_active")
    list_filter = ("is_active", "created_at", "updated_at")
    search_fields = ("file",)
    ordering = ("-created_at",)
    readonly_fields = ("created_at", "updated_at")
