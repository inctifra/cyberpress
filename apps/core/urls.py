from django.urls import path
from apps.core import views


urlpatterns = [
    path("", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("upload/", views.upload_view, name="upload"),
    path("access/", views.access_view, name="access"),
    path("delete-files/", views.delete_files_view, name="delete_files"),
    path("coming-soon/", views.coming_soon_view, name="coming_soon"),
]
