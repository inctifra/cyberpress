from rest_framework.serializers import ModelSerializer

from .models import File
from .models import PrintSession


class FileMediaSerializer(ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

class PrintSessionSerializer(ModelSerializer):
    files = FileMediaSerializer(many=True)
    class Meta:
        model = PrintSession
        fields = ["access_code", "files"]
