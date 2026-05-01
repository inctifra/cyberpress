from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class DashboardOnboardingView(LoginRequiredMixin, TemplateView):
    template_name = "dashboard/onboarding.html"
