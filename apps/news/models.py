from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.search import index
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, InlinePanel
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase
from modelcluster.fields import ParentalKey
from wagtailmetadata.models import MetadataPageMixin


class ArticlePageTag(TaggedItemBase):
    content_object = ParentalKey(
        "news.ArticlePage",
        related_name="tagged_items",
        on_delete=models.CASCADE,
    )


class Category(models.Model):
    category = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        related_name="children",
        on_delete=models.CASCADE,
        verbose_name="Parent Category",
        help_text="The parent category for this category.",
    )
    name = models.CharField(
        max_length=255,
        verbose_name="Category Name",
        help_text="The name of the category.",
    )

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

        indexes = [
            models.Index(fields=["category", "name"], name="category_name_idx"),
        ]

        constraints = [
            models.UniqueConstraint(
                fields=["category", "name"],
                name="unique_category_name_per_parent",
            ),
        ]

    def __str__(self):
        return self.name


class ArticleIndexPage(MetadataPageMixin, Page):
    """Index page for articles."""

    intro = RichTextField(blank=True)
    tagline = models.CharField(max_length=255, blank=True)

    subpage_types = ["news.ArticlePage"]

    content_panels = [
        *Page.content_panels,
        FieldPanel("tagline"),
        FieldPanel("intro"),
    ]

    template = "news/article_index_page.html"

    class Meta:
        verbose_name = "Article Index Page"
        verbose_name_plural = "Article Index Pages"

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["articles"] = (
            ArticlePage.objects.child_of(self).live().order_by("-date")
        )
        return context


class ArticlePage(Page):
    """A news article page."""

    date = models.DateField("Post date")
    body = RichTextField(blank=True)
    category = models.ForeignKey(
        "news.Category",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="articles",
    )
    cover = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    tags = ClusterTaggableManager(through=ArticlePageTag, blank=True)
    search_fields = [
        *Page.search_fields,
        index.SearchField("body"),
        index.FilterField("date"),
        index.FilterField("category"),
    ]

    content_panels = [
        *Page.content_panels,
        FieldPanel("category"),
        FieldPanel("date"),
        FieldPanel("body"),
        FieldPanel("cover"),
    ]

    promote_panels = [
        MultiFieldPanel(Page.promote_panels, "Common page configuration"),
        FieldPanel("cover"),
        FieldPanel("tags"),
    ]

    parent_page_types = ["news.ArticleIndexPage"]

    def get_sitemap_urls(self, request=None):
        return [
            {
                "location": self.get_full_url(),
                "lastmod": self.last_published_at,
                "priority": 0.8,
                "changefreq": "weekly",
            },
        ]

    class Meta:
        verbose_name = "Article Page"
        verbose_name_plural = "Article Pages"
