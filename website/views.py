import datetime

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
    # Setup
    month = int(datetime.datetime.now().strftime("%m").replace("0", "")) - 1
    councilmans = CouncilmanDebits.objects.all()

    # Queries
    registers = councilmans.values('month').annotate(dcount=Count('month'))
    total_year_used = CouncilmanDebits.objects.aggregate(Sum('value'))
    total_month_used = CouncilmanDebits.objects.filter(month=month).aggregate(Sum('value'))

    # Organize data
    register_by_month ={}
    for el in registers:
        register_by_month[int(el['month'])] = el['dcount']

    # Format and return
    data = {
        'total_used': {
            'year': total_year_used,
            'month': total_month_used
        },
        'registers': register_by_month,
    }
    return JsonResponse(data)
