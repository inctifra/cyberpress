from __future__ import annotations

import typing

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings

if typing.TYPE_CHECKING:
    from allauth.socialaccount.models import SocialLogin
    from django.http import HttpRequest

    from ifidel.users.models import User


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest) -> bool:
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(
        self,
        request: HttpRequest,
        sociallogin: SocialLogin,
    ) -> bool:
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def populate_user(  # noqa: C901
        self,
        request: HttpRequest,
        sociallogin: SocialLogin,
        data: dict[str, typing.Any],
    ) -> User:
        """
        Populates user information from social provider info.

        See: https://docs.allauth.org/en/latest/socialaccount/advanced.html#creating-and-populating-user-instances
        """
        user = super().populate_user(request, sociallogin, data)
        if not user.name:
            if name := data.get("name"):
                user.name = name
            elif first_name := data.get("first_name"):
                user.name = first_name
                if last_name := data.get("last_name"):
                    user.name += f" {last_name}"
        if not getattr(user.profile, "avatar", None):
            provider = sociallogin.account.provider
            extra_data = sociallogin.account.extra_data
            avatar_url = None
            match provider:
                case "google":
                    avatar_url = extra_data.get("picture")
                case "facebook":
                    avatar_url = f"https://graph.facebook.com/{extra_data.get('id')}/picture?type=large"
                case "github":
                    avatar_url = extra_data.get("avatar_url")
                case "twitter":
                    avatar_url = extra_data.get("profile_image_url_https")
            if avatar_url:
                user.profile.avatar = avatar_url
        return user
