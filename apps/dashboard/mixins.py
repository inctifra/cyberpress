from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.mixins import UserPassesTestMixin
from django.shortcuts import redirect


class RedirectToDashboardSetupMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        return self.request.user.account_type not in ["customer", "cybercafe_owner"]

    def handle_no_permission(self):
        return redirect("dashboard:onboarding")
