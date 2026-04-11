from django.urls import path

from . import views

app_name = "partials"

urlpatterns = [
    path(
        "search-cafe-view/",
        views.search_cafe_partials_view,
        name="search_cafe_view",
    ),
]
