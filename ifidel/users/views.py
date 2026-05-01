from allauth.account.views import LoginView
from allauth.account.views import SignupView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import QuerySet
from django.http import JsonResponse
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView
from django.views.generic import RedirectView
from django.views.generic import UpdateView

from ifidel.users.models import User


class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    slug_field = "id"
    slug_url_kwarg = "id"


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ["name"]
    success_message = _("Information successfully updated")

    def get_success_url(self) -> str:
        assert self.request.user.is_authenticated  # type guard
        return self.request.user.get_absolute_url()

    def get_object(self, queryset: QuerySet | None = None) -> User:
        assert self.request.user.is_authenticated  # type guard
        return self.request.user


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self) -> str:
        return reverse("dashboard:onboarding")


user_redirect_view = UserRedirectView.as_view()


class UserAllauthAccountLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def form_valid(self, form):
        response = super().form_valid(form)
        user = self.request.user
        url = user.get_dashboard_url() if user.is_authenticated else self.get_next_url()
        return JsonResponse(
            {
                "success": True,
                "message": "Login successful.",
                "redirect_url": url,
            },
            status=response.status_code,
        )

    def form_invalid(self, form):
        """Return JSON error instead of HTML template"""
        errors = {}
        if form.non_field_errors():
            errors["__all__"] = form.non_field_errors()
        for field_name, field_errors in form.errors.items():
            if field_name != "__all__":
                errors[field_name] = field_errors  # noqa: PERF403

        return JsonResponse(
            {
                "success": False,
                "errors": errors,
                "message": "Login failed. Please check your credentials.",
            },
            status=400,
        )


class UserAllauthAccountSignupView(SignupView):
    def form_valid(self, form):
        return super().form_valid(form)

    def form_invalid(self, form):
        errors = {}
        if form.non_field_errors():
            errors["__all__"] = form.non_field_errors()
        for field_name, field_errors in form.errors.items():
            if field_name != "__all__":
                errors[field_name] = field_errors  # noqa: PERF403

        return JsonResponse(
            {
                "success": False,
                "errors": errors,
                "message": "Registration failed. Please check the provided information.",  # noqa: E501
            },
            status=400,
        )


