from wagtail.admin.panels import FieldPanel
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet

from .models import Category


class CategorySnippetViewSet(SnippetViewSet):
    model = Category

    panels = [
        FieldPanel("name"),
        FieldPanel("category"),
    ]


register_snippet(CategorySnippetViewSet)
