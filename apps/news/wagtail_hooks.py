from wagtail.snippets.models import register_snippet
from wagtail.admin.panels import FieldPanel
from .models import Category
from wagtail.snippets.views.snippets import SnippetViewSet


class CategorySnippetViewSet(SnippetViewSet):
    model = Category

    panels = [
        FieldPanel("name"),
        FieldPanel("category"),
    ]


register_snippet(CategorySnippetViewSet)
