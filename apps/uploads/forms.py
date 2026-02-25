from django import forms

from .models import PrintSession
from ._utils import MultipleFileInput



class PrintSessionForm(forms.ModelForm):

    class Meta:
        model = PrintSession
        fields = ["passkey"]
        widgets = {
            "passkey": forms.PasswordInput(attrs={"class": "form-control"}),
        }


class AccessSessionForm(forms.Form):
    passkey = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control"}),
        required=True,
    )

