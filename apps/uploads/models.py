import uuid

from django.db import models
from django.urls import reverse
from django.utils import timezone

from apps.uploads.helpers import default_expiry
from apps.uploads.helpers import generate_session_code


class PrintSession(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("expired", "Expired"),
        ("deleted", "Deleted"),
        ("printed", "Printed"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(
        "users.Profile",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="sessions",
    )
    access_code = models.CharField(
        max_length=6,
        unique=True,
        default=generate_session_code,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=default_expiry)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="active",
    )
    metadata = models.JSONField(
        default=dict,
        blank=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Session {self.access_code}"

    def save(self, *args, **kwargs):
        """Ensure access_code is unique on save."""
        if not self.access_code:
            self.access_code = generate_session_code()
        while (
            PrintSession.objects.select_related("profile")
            .filter(access_code=self.access_code)
            .exists()
        ):
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
    metadata = models.JSONField(
        default=dict,
        blank=True,
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def get_delete_partial_delete_url(self):
        return reverse("partials:delete_session_file", kwargs={"pk": self.pk})


class SessionEvent(models.Model):
    EVENT_TYPES = [
        ("created", "Created"),
        ("file_uploaded", "File Uploaded"),
        ("printed", "Printed"),
        ("expired", "Expired"),
        ("deleted", "Deleted"),
        ("restored", "Restored"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    session = models.ForeignKey(
        PrintSession,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="events",
    )

    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)

    access_code = models.CharField(max_length=6)

    customer_snapshot = models.JSONField(default=dict, blank=True)

    session_snapshot = models.JSONField(default=dict, blank=True)

    metadata = models.JSONField(default=dict, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    created_by = models.ForeignKey(
        "users.Profile",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.access_code} - {self.event_type}"
