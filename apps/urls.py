from django.urls import path, include
from django.contrib.sitemaps.views import sitemap
from apps.feeds.views import ArticleSitemap, LatestArticlesFeed, robots_txt

sitemaps = {
    "articles": ArticleSitemap,
}

urlpatterns = []
urlpatterns = [
    path("", include("apps.core.urls")),
    path("feeds/", LatestArticlesFeed()),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="sitemap"),
    path("robots.txt", robots_txt),
]
