import json

from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from django.http import HttpRequest
from django.http import JsonResponse
from django.shortcuts import render

from apps.uploads.models import PrintSession
from ifidel.users.forms import ProfileUpdateForm


@login_required
def customer_dashboard(request: HttpRequest):
    session = PrintSession.objects.prefetch_related("customer").filter(
        customer=request.user.profile,
    )
    context = {"sessions": session.aggregate(files_count=Sum("files"))}
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            return JsonResponse({"errors": str(e)}, status=400)
        form = ProfileUpdateForm(data=data, instance=request.user.profile)
        if not form.is_valid():
            return JsonResponse(form.errors.get_json_data(), status=400)
        form.save()
        return JsonResponse({"detail": "Profile Updated successfully"}, status=200)
    return render(request, "dashboard/customer/dashboard.html", context)
