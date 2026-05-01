from django.urls import include
from django.urls import path

from .views import DashboardOnboardingView

app_name = "dashboard"


urlpatterns = [
    path("", DashboardOnboardingView.as_view(), name="onboarding"),
    path("cybercafe/", include("apps.dashboard.cybercafe.urls", namespace="cybercafe")),
    path("customers/", include("apps.dashboard.customers.urls", namespace="customers")),
]
