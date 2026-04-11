from django.shortcuts import render
from django.http.request import HttpRequest
from cyberpress_cybercafe.models import CyberCafe
from django.db.models import Q
from django.views import View


def request_print_partial_form_view(request):
    return render(request, "pages/partials/request.html")


class SearchCafePartialView(View):
    template_name = "pages/components/request/partials/cafe.html"
    queryset = None

    def _queryset(self):
        name = self.request.GET.get("name", None)
        mode = self.request.GET.get("mode")
        if name:
            self.queryset = CyberCafe.objects.filter(
                Q(name__icontains=name) & Q(is_active=True)
            )
        elif mode == "reset":
            self.queryset = CyberCafe.objects.filter(Q(is_active=True))
        return self.queryset

    def get(self, request, *args, **kwargs):
        qs = self._queryset()
        return render(request, self.template_name, {"cafes": qs})


search_cafe_partials_view = SearchCafePartialView.as_view()
