from .models import PrintSession, File

from rest_framework.serializers import ModelSerializer

class FileMediaSerializer(ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

class PrintSessionSerializer(ModelSerializer):
    files = FileMediaSerializer(many=True)
    class Meta:
        model = PrintSession
        fields = ["access_code", "files"]
