

from django.urls import path

from apps.dashboard.customers.views import customer_dashboard

app_name = "customers"

urlpatterns = [
    path("", customer_dashboard, name="index"),
]
