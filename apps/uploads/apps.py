from django.apps import AppConfig


class UploadsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.uploads"

    def ready(self):
        import apps.uploads.signals  # noqa: F401, PLC0415
