from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class QRCode(TimestampedModel):
    file = models.FileField(upload_to="qrcodes/")

    def __str__(self):
        return self.file.name
