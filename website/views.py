import json

from django.db.models import Count, Sum
from django.shortcuts import render
from django.http import JsonResponse
from api.models import CouncilmanDebits


# Create your views here.
def index(request):
    return render(request, 'website/debits_content.html')


def about(request):
    return render(request, 'website/about.html')


def contact(request):
    return render(request, 'website/contact.html')


def get_dashboard_values(request):
    councilmans = CouncilmanDebits.objects.all()
    registers = councilmans.values('month').annotate(dcount=Count('month'))
    total_used = CouncilmanDebits.objects.aggregate(Sum('value'))
    register_by_month ={}
    for el in registers:
        register_by_month[int(el['month'])] = el['dcount']

    data = {
        'total_used': total_used,
        'registers': register_by_month,
    }
    return JsonResponse(data)
