from django.contrib import admin
from .models import PrintSession, File


class FileInline(admin.TabularInline):
    model = File
    extra = 0
    readonly_fields = ("name", "size", "file")


@admin.register(PrintSession)
class PrintSessionAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "created_at",
        "expires_at",
        "expired_status",
    )

    list_filter = ("created_at", "expires_at")
    search_fields = ("code",)
    readonly_fields = ("id", "code", "passkey_hash", "created_at", "expires_at")
    inlines = [FileInline]

    def expired_status(self, obj):
        return obj.is_expired()

    expired_status.boolean = True
    expired_status.short_description = "Expired"


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ("name", "session", "size")
    search_fields = ("name", "session__code")
    list_filter = ("session__created_at",)

