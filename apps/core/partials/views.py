from cyberpress_cybercafe.models import CyberCafe
from django.db.models import Q
from django.http import HttpRequest
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.views import View
from django.views.decorators.http import require_POST

from apps.uploads.models import File
from apps.uploads.models import PrintSession
from apps.uploads.serializers import PrintSessionSerializer


class SearchCafePartialView(View):
    template_name = "pages/components/request/partials/cafe.html"
    queryset = None

    def _queryset(self):
        name = self.request.GET.get("name", None)
        mode = self.request.GET.get("mode")
        if name:
            self.queryset = CyberCafe.objects.filter(
                Q(name__icontains=name) & Q(is_active=True),
            )
        elif mode == "reset":
            self.queryset = CyberCafe.objects.filter(Q(is_active=True))
        return self.queryset

    def get(self, request, *args, **kwargs):
        qs = self._queryset()
        return render(request, self.template_name, {"cafes": qs})


search_cafe_partials_view = SearchCafePartialView.as_view()


class AccessSessionFilesPartialsView(View):
    def get(self, request, *args, **kwargs):
        access_code = request.GET.get("access_code")

        session = (
            PrintSession.objects.prefetch_related("customer")
            .filter(access_code=access_code)
            .first()
        )
        if session:
            session_serializer = PrintSessionSerializer(instance=session)
            if session.is_expired():
                session.delete()
                return render(
                    request,
                    "pages/partials/access_empty.html",
                    {
                        "files": None,
                        "error_message": "This session has expired.",
                        "session_json": None,
                    },
                )

            files = File.objects.filter(session=session)
            if files.exists():
                context = {
                    "files": files,
                    "session": session,
                    "session_json": session_serializer.data,
                }
                return render(
                    request,
                    "pages/components/access/access-files.html",
                    context,
                )
        return render(
            request,
            "pages/partials/access_empty.html",
            {
                "error_message": "No files found for this session.",
                "session_json": None,
            },
        )


access_session_files_partial_view = AccessSessionFilesPartialsView.as_view()


@require_POST
def delete_file_view(request: HttpRequest, pk):
    try:
        file = get_object_or_404(File, pk=pk)
    except File.DoesNotExist:
        return JsonResponse({"errors": "File does not exists!"}, status=404)
    file.delete()
    return JsonResponse({}, status=204)
