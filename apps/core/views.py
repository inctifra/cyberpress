from cyberpress_cybercafe.models import CyberCafe
from django.db import IntegrityError
from django.http import HttpRequest
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import ListView
from django.views.generic import TemplateView
from django.views.generic import View

from apps.uploads.forms import AccessSessionForm
from apps.uploads.forms import PrintSessionForm
from apps.uploads.models import File
from apps.uploads.models import PrintSession


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
                session = form.save(commit=False)
                if self.request.user.is_authenticated:
                    session.customer = self.request.user.profile
                    session.save()
                form.save()
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


access_view = AccessView.as_view()


class DeleteFilesView(View):
    def post(self, request: HttpRequest, *args, **kwargs):
        access_code = request.POST.get("access_code")
        session = PrintSession.objects.filter(access_code=access_code).first()
        if session:
            session.delete()
            return JsonResponse({"detail": "Files deleted successfully."}, status=200)
        return JsonResponse(
            {"detail": "Could not delete. Invalid access code."},
            status=400,
        )


delete_files_view = DeleteFilesView.as_view()


class RequestPrintingView(ListView):
    template_name = "pages/request.html"
    queryset = CyberCafe.objects.filter(is_active=True)
    context_object_name = "cafes"


request_printing_view = RequestPrintingView.as_view()


class ComingSoonView(TemplateView):
    template_name = "pages/soon.html"


coming_soon_view = ComingSoonView.as_view()


class PricingView(TemplateView):
    template_name = "pages/pricing.html"


pricing_view = PricingView.as_view()
