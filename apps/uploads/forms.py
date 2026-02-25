from django import forms

from .models import PrintSession


class PrintSessionForm(forms.ModelForm):
    files = forms.FileField(
        widget=forms.FileInput(
            attrs={
                "class": "form-control form-control-lg",
                "accept": "application/pdf",
            },
        ),
    )

    class Meta:
        model = PrintSession
        fields = ["files"]
        widgets = {
            "passkey": forms.PasswordInput(attrs={"class": "form-control"}),
        }


class AccessSessionForm(forms.Form):
    access_code = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control"}),
        required=True,
    )
