from django.urls import path
from . import views

app_name = "partials"

urlpatterns = [
    path(
        "request-print-form-view/",
        views.request_print_partial_form_view,
        name="request_print_form_view",
    )
]
