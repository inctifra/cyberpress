

from django.shortcuts import redirect


def customer_dashboard(request):
    # return render(request, "dashboard/customer/dashboard.html")  # noqa: ERA001
        return redirect("dashboard:onboarding")
