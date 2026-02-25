from django.urls import path
from apps.core import views


urlpatterns = [
    path("", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("upload/", views.upload_view, name="upload"),
    path("access/", views.access_view, name="access"),
]
