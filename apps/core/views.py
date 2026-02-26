from django.shortcuts import render
from apps.uploads.forms import AccessSessionForm, PrintSessionForm
from apps.uploads.models import File, PrintSession
from django.views.generic import TemplateView, View
from django.http import HttpRequest, JsonResponse
from django.db import IntegrityError


def home(request):
    return render(request, "pages/home.html")


def about(request):
    return render(request, "pages/about.html")


class FileUploadView(TemplateView):
    template_name = "pages/upload.html"
    form_class = PrintSessionForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = self.form_class()
        return context

    def post(self, *args, **kwargs):
        form = self.form_class(self.request.POST, self.request.FILES)
        files = self.request.FILES.getlist("files")

        if not files:
            return JsonResponse(
                {"detail": "Please select at least one PDF file."},
                safe=False,
                status=400,
            )

        if form.is_valid():
            try:
                session = form.save()
                for f in files:
                    File.objects.create(
                        session=session,
                        file=f,
                        name=f.name,
                        size=f.size,
                    )
                return JsonResponse(
                    {
                        "detail": "Files uploaded successfully.",
                        "access_code": session.access_code,
                    },
                    status=201,
                )
            except (IntegrityError, ValueError) as e:
                return JsonResponse(
                    {"detail": "Error uploading files.", "error": str(e)},
                    status=400,
                )

        return JsonResponse(
            {"detail": "Form is not valid.", "errors": form.errors},
            status=400,
        )


upload_view = FileUploadView.as_view()


class AccessView(TemplateView):
    template_name = "pages/access.html"
    form_class = AccessSessionForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = self.form_class()
        return context

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            access_code = form.cleaned_data.get("access_code")
            session = PrintSession.objects.filter(access_code=access_code).first()
            print(f"Access code: {access_code}, Session found: {session}")
            if session:
                if session.is_expired():
                    session.delete()
                    return render(
                        request,
                        "pages/partials/access_empty.html",
                        {"files": None, "error_message": "This session has expired."},
                    )

                files = File.objects.filter(session=session)
                if files.exists():
                    return render(
                        request,
                        "pages/partials/access.html",
                        {"files": files},
                    )
                return render(
                    request,
                    "pages/partials/access_empty.html",
                    {"error_message": "No files found for this session."},
                )

            return render(
                request,
                "pages/partials/access_empty.html",
                {"error_message": "Invalid access code."},
            )

        return render(
            request,
            "pages/partials/access_empty.html",
            {"error_message": "Access code is required."},
        )


access_view = AccessView.as_view()


class DeleteFilesView(View):
    def post(self, request: HttpRequest, *args, **kwargs):
        access_code = request.POST.get("access_code")
        session = PrintSession.objects.filter(access_code=access_code).first()
        if session:
            session.delete()
            return JsonResponse({"detail": "Files deleted successfully."}, status=200)
        return JsonResponse({"detail": "Invalid access code."}, status=400)


delete_files_view = DeleteFilesView.as_view()


class ComingSoonView(TemplateView):
    template_name = "pages/soon.html"


coming_soon_view = ComingSoonView.as_view()



