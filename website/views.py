from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'website/debits_content.html')
