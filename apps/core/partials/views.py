from django.shortcuts import render


def request_print_partial_form_view(request):
    return render(request, "pages/partials/request.html")
