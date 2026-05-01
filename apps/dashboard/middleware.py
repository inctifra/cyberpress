# middleware.py
from django.shortcuts import redirect
from django.urls import reverse


class AccountTypeRedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.customer_home = reverse("dashboard:customers:index")
        self.cyber_home = reverse("dashboard:cybercafe:index")
        self.onboarding = reverse("dashboard:onboarding")

        self.exempt_paths = {
            "/accounts/",  # allauth URLs
            "/__reload__/",  # django-browser-reload
            "/static/",  # static files
            "/media/",  # media files
            "/admin/",  # admin panel
        }

        self.home_paths = {
            self.customer_home,
            self.cyber_home,
            self.onboarding,
        }

    def _is_exempt(self, path):
        """Check if path should skip middleware entirely."""
        for exempt in self.exempt_paths:
            if path.startswith(exempt):
                return True
        return path in self.home_paths

    def __call__(self, request):
        user = request.user
        path = request.path

        if (
            not user.is_authenticated
            or self._is_exempt(path)
            or path in self.home_paths
        ):
            return self.get_response(request)

        if user.account_type == "customer":
            return self.get_response(request)

        if user.account_type == "cybercafe_owner":
            return (
                self.get_response(request)
                if path == self.cyber_home
                else redirect(self.cyber_home)
            )

        return (
            self.get_response(request)
            if path == self.onboarding
            else redirect(self.onboarding)
        )
