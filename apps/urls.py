from django.contrib.sitemaps.views import sitemap
from django.urls import include
from django.urls import path

from apps.feeds.views import ArticleSitemap
from apps.feeds.views import LatestArticlesFeed
from apps.feeds.views import robots_txt

sitemaps = {
    "articles": ArticleSitemap,
}

urlpatterns = [
    path("", include("apps.core.urls")),
    path("dashboard/", include("apps.dashboard.urls", namespace="dashboard")),
    path("feeds/", LatestArticlesFeed()),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="sitemap"),
    path("robots.txt", robots_txt),
]
