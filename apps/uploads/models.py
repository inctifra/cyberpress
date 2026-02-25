import secrets
import uuid
from datetime import timedelta

from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.db import models
from django.utils import timezone


def default_expiry():
    return timezone.now() + timedelta(hours=24)


def generate_session_code():
    return secrets.token_hex(3)


class PrintSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=12, unique=True, db_index=True)
    passkey_hash = models.CharField(max_length=255, editable=False)
    passkey = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=default_expiry)

    def __str__(self):
        return f"Session {self.code}"

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = generate_session_code()
        super().save(*args, **kwargs)

    @classmethod
    def create_with_passkey(cls, raw_passkey):
        session = cls()
        session.passkey_hash = make_password(raw_passkey)
        session.save()
        return session

    def check_passkey(self, raw_passkey):
        return check_password(raw_passkey, self.passkey_hash)

    def is_expired(self):
        return timezone.now() > self.expires_at


class File(models.Model):
    session = models.ForeignKey(
        PrintSession,
        on_delete=models.CASCADE,
        related_name="files",
    )
    file = models.FileField(upload_to="pdfs/")
    name = models.CharField(max_length=255)
    size = models.PositiveIntegerField()

    def __str__(self):
        return self.name
