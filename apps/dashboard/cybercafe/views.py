from django.shortcuts import redirect


def cybercafe_dashboard(request):
    # return render(request, "dashboard/cybercafe/dashboard.html")  # noqa: ERA001
    return redirect("dashboard:onboarding")
