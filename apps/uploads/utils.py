from .models import PrintSession


def access_session(code, passkey):
    try:
        session = PrintSession.objects.get(code=code)
    except PrintSession.DoesNotExist:
        return None

    if session.is_expired():
        return None

    if not session.check_passkey(passkey):
        return None

    return session
