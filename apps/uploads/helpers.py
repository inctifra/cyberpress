import secrets
from datetime import timedelta

from django.utils import timezone


def default_expiry():
    return timezone.now() + timedelta(hours=24)


def generate_session_code():
    return secrets.token_hex(3)
