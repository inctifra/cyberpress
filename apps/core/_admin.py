from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _


class CustomAdminSite(AdminSite):
    site_header = _("Cyberconnect Administration")
    site_title = _("Cyberconnect Admin")
    index_title = _("Welcome to Cyberconnect Dashboard")


_admin_site = CustomAdminSite(name="custom_admin")

