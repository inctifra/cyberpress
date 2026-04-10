from django.utils.timezone import now
from rest_framework import generics
from rest_framework.permissions import AllowAny
from apps.uploads.models import PrintSession
from apps.uploads.serializers import PrintSessionSerializer


class ListPrintJobAPIView(generics.ListAPIView):
    serializer_class = PrintSessionSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    queryset = PrintSession.objects.all()

    def get_queryset(self):
        return self.queryset.filter(expires_at__gt=now())
