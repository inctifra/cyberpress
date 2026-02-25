from django.shortcuts import render
from apps.uploads.forms import AccessSessionForm, PrintSessionForm
from apps.uploads.models import File, PrintSession


def home(request):
    return render(request, "pages/home.html")


def about(request):
    return render(request, "pages/about.html")


def upload(request):
    if request.method == "POST":
        form = PrintSessionForm(request.POST)
        files = request.FILES.getlist("files")

        if form.is_valid() and files:
            session = form.save(commit=False)
            session.create_with_passkey(form.cleaned_data["passkey"])
            session.save()

            for f in files:
                File.objects.create(
                    session=session,
                    file=f,
                    name=f.name,
                    size=f.size,
                )

            return render(
                request,
                "pages/upload.html",
                {
                    "form": PrintSessionForm(),
                    "success": True,
                },
            )
    else:
        form = PrintSessionForm()
    return render(request, "pages/upload.html", {"form": form})


def access(request):
    form = AccessSessionForm()
    context = {"form": form}

    if request.method == "POST":
        form = AccessSessionForm(request.POST)
        if form.is_valid():
            passkey = form.cleaned_data["passkey"]

            # Find session by checking hash
            session = None
            for s in PrintSession.objects.all():
                print(f"Checking session {s.code} with hash {s.passkey_hash}")
                print(s.check_passkey(passkey))
                if s.check_passkey(passkey):
                    session = s
                    break

            if not session:
                context["error"] = "Invalid passkey."
                context["form"] = form
                return render(request, "pages/access.html", context)

            if session.is_expired():
                context["error"] = "This session has expired."
                return render(request, "pages/access.html", context)

            # Fetch related files
            files = session.files.all()
            print(f"Found {files.count()} files for session {session.code}")

            context["files"] = files
            return render(request, "pages/access.html", context)

    return render(request, "pages/access.html", context)
