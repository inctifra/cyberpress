from django.urls import path

from .views import ListPrintJobAPIView

urlpatterns = [path("list", ListPrintJobAPIView.as_view())]
