from .base import env

# GENERAL WAGTAIL SETTINGS
DATA_UPLOAD_MAX_NUMBER_FIELDS = 10_000
WAGTAIL_SITE_NAME = "CyberConnect"
WAGTAILADMIN_BASE_URL = env(
    "DJANGO_WAGTAILADMIN_BASE_URL", default="http://localhost:8000"
)
WAGTAIL_APPEND_SLASH = True
WAGTAILDOCS_EXTENSIONS = [
    "csv",
    "docx",
    "key",
    "pdf",
    "pptx",
    "txt",
    "xlsx",
    "zip",
]
