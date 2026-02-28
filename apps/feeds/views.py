from django.utils.feedgenerator import Rss201rev2Feed
from django.contrib.syndication.views import Feed
from django.http import HttpResponse
from apps.news.models import ArticlePage


class LatestArticlesFeed(Feed):
    title = "Latest Security Articles"
    link = "/news/"
    description = "Cybersecurity and secure printing updates."

    def __call__(self, request, *args, **kwargs):
        response = super().__call__(request, *args, **kwargs)
        response["Content-Type"] = "text/xml; charset=utf-8"
        return response

    def items(self):
        return ArticlePage.objects.live().order_by("-date")[:20]

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.body

    def item_link(self, item):
        return item.get_full_url()


from django.contrib.sitemaps import Sitemap


class ArticleSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return ArticlePage.objects.live()

    def lastmod(self, obj: ArticlePage):
        return obj.last_published_at


def robots_txt(request):
    lines = [
        "User-Agent: *",
        "Allow: /",
        "",
        "# Block admin areas",
        "Disallow: /cms/",
        "Disallow: /admin/",
        "Disallow: /django-admin/",
        "",
        f"Sitemap: {request.scheme}://{request.get_host()}/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")
