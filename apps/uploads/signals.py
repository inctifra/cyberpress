from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import File


@receiver(post_delete, sender=File)
def delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes the actual file from storage
    when a File object is deleted.
    """
    if instance.file:
        instance.file.delete(save=False)
