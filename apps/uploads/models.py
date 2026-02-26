import secrets
import uuid
from datetime import timedelta

import bcrypt
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.db import models
from django.utils import timezone

# example password
password = "passwordabc"

# converting password to array of bytes
bytes = password.encode("utf-8")
salt = bcrypt.gensalt()
hash = bcrypt.hashpw(bytes, salt)
userPassword = "password000"
userBytes = userPassword.encode("utf-8")

result = bcrypt.checkpw(userBytes, hash)


def default_expiry():
    return timezone.now() + timedelta(hours=24)


def generate_session_code():
    return secrets.token_hex(3)


def _ensure_passkey_encode_hash(passkey: str) -> str:
    return bcrypt.hashpw(passkey.encode("utf-8"), bcrypt.gensalt())


def _check_passkey(passkey: str, passkey_hash: str) -> bool:
    return bcrypt.checkpw(passkey.encode("utf-8"), passkey_hash.encode("utf-8"))


class PrintSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    access_code = models.CharField(
        max_length=6, unique=True, default=generate_session_code,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=default_expiry)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Session {self.access_code}"

    def save(self, *args, **kwargs):
        """Ensure access_code is unique on save."""
        if not self.access_code:
            self.access_code = generate_session_code()
        while PrintSession.objects.filter(access_code=self.access_code).exists():
            self.access_code = generate_session_code()
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.expires_at
    @property
    def age_hours(self) -> int:
        """
        How many hours since this session was created
        """
        return int((timezone.now() - self.created_at).total_seconds() // 3600)

    @property
    def remaining_hours(self) -> int:
        """
        How many hours until expiration (0 if expired)
        """
        remaining = (self.expires_at - timezone.now()).total_seconds()
        return max(0, int(remaining // 3600))

    @property
    def total_lifetime_hours(self) -> int:
        """
        Total lifetime of the session in hours (e.g. 24)
        """
        return int((self.expires_at - self.created_at).total_seconds() // 3600)


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
