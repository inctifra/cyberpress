import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http.request import HttpRequest
from django.http.response import JsonResponse
from django.views.generic import TemplateView


class DashboardOnboardingView(LoginRequiredMixin, TemplateView):
    template_name = "users/select_account.html"

    def post(self, request: HttpRequest, *args, **kwargs):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": str(e)}, status=400)
        user = request.user
        user.account_type = data.get("account")
        user.save()
        return JsonResponse(
            {
                "url": str(user.get_dashboard_url()),
                "message": "Account setup was successful",
            },
            status=200,
        )
