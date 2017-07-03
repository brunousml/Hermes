from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'website/debits_content.html')


def about(request):
    return render(request, 'website/about.html')


def contact(request):
    return render(request, 'website/contact.html')
