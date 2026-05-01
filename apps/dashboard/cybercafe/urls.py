

from django.urls import path

from apps.dashboard.cybercafe.views import cybercafe_dashboard

app_name = "cybercafe"
urlpatterns = [
    path("", cybercafe_dashboard, name="index"),
]
