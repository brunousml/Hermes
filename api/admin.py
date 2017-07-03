from django.contrib import admin
from .models import Councilman,CouncilmanDebits,City,Country,State

# Register your models here.
admin.site.register(Country)
admin.site.register(CouncilmanDebits)
admin.site.register(Councilman)
admin.site.register(City)
admin.site.register(State)