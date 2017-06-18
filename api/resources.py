from tastypie import fields
from tastypie.resources import ModelResource
from api.models import CouncilmanDebits, Councilman


class CouncilmanResource(ModelResource):
    class Meta:
        queryset = Councilman.objects.all()
        resource_name = 'Councilman'


class CouncilmanDebitsResource(ModelResource):
    councilman = fields.ToOneField(CouncilmanResource, 'councilman', full=True)

    class Meta:
        queryset = CouncilmanDebits.objects.all()
        resource_name = 'CouncilmanDebits'
