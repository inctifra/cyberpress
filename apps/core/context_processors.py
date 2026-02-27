from apps.core.models import QRCode


def qrcodes_context_processor(request):
    qrcode = QRCode.objects.filter(is_active=True).order_by("-created_at")
    qrcode = qrcode.first() if qrcode.exists() else None
    return {
        "app_name": "QR Codes",
        "qrcode": qrcode,
    }
