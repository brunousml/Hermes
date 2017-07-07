from tastypie import fields
from tastypie.resources import ModelResource
from api.models import CouncilmanDebits, Councilman
from tastypie.constants import ALL, ALL_WITH_RELATIONS


class CouncilmanResource(ModelResource):
    class Meta:
        queryset = Councilman.objects.all()
        resource_name = 'Councilman'
        filtering = {
            "name": ALL,
        }


class CouncilmanDebitsResource(ModelResource):
    councilman = fields.ToOneField(CouncilmanResource, 'councilman', full=True)

    class Meta:
        queryset = CouncilmanDebits.objects.all()
        resource_name = 'CouncilmanDebits'
        filtering = {
            "cost_object": ALL,
        }
