from django.contrib import admin
from .models import PrintSession, File

from apps.core._admin import _admin_site


class FileInline(admin.TabularInline):
    model = File
    extra = 0
    readonly_fields = ("name", "size", "file")


@admin.register(PrintSession, site=_admin_site)
class PrintSessionAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "expires_at",
        "expired_status",
        "access_code",
        "age_hours",
        "remaining_hours",
        "total_lifetime_hours",
    )

    list_filter = ("created_at", "expires_at")
    readonly_fields = ("id", "created_at", "expires_at", "access_code")
    inlines = [FileInline]

    def expired_status(self, obj):
        return obj.is_expired()

    expired_status.boolean = True
    expired_status.short_description = "Expired"


@admin.register(File, site=_admin_site)
class FileAdmin(admin.ModelAdmin):
    list_display = ("name", "session", "size")
    search_fields = ("name", "session__code")
    list_filter = ("session__created_at",)

