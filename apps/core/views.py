from django.shortcuts import render
from apps.uploads.forms import AccessSessionForm, PrintSessionForm
from apps.uploads.models import File, PrintSession
from django.views.generic import TemplateView
from django.http import HttpRequest
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
            return render(
                self.request,
                self.template_name,
                {"form": form, "files_error": "Please select at least one PDF file."},
            )

        if form.is_valid():
            try:
                session = form.save()  # access_code is auto-generated
                for f in files:
                    File.objects.create(
                        session=session,
                        file=f,
                        name=f.name,
                        size=f.size,
                    )
                # Pass the access_code to template for user
                return render(
                    self.request,
                    self.template_name,
                    {
                        "form": self.form_class(),
                        "success": True,
                        "access_code": session.access_code,
                    },
                )
            except (IntegrityError, ValueError) as e:
                return render(
                    self.request,
                    self.template_name,
                    {"form": form, "non_field_error": str(e)},
                )

        return render(self.request, self.template_name, {"form": form})


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
                        self.template_name,
                        {"form": form, "error": "This session has expired."},
                    )

                files = File.objects.filter(session=session)
                if files.exists():
                    return render(
                        request, self.template_name, {"form": form, "files": files}
                    )
                return render(
                    request,
                    self.template_name,
                    {"form": form, "error": "No files found for this session."},
                )

            return render(
                request,
                self.template_name,
                {"form": form, "error": "Invalid access code."},
            )

        return render(
            request,
            self.template_name,
            {"form": form, "error": "Access code is required."},
        )


access_view = AccessView.as_view()
