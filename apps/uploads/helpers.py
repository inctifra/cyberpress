from django.utils import timezone
from datetime import timedelta
import secrets


def default_expiry():
    return timezone.now() + timedelta(hours=24)


def generate_session_code():
    return secrets.token_hex(3)
