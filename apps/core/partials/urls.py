from django.urls import path

from . import views

app_name = "partials"

urlpatterns = [
    path(
        "search-cafe-view/",
        views.search_cafe_partials_view,
        name="search_cafe_view",
    ),
    path(
        "search-session-files/",
        views.access_session_files_partial_view,
        name="search_session_files_views",
    ),
    path(
        "delete-session-files/<pk>/",
        views.delete_file_view,
        name="delete_session_file",
    ),
]
