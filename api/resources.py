from tastypie.resources import ModelResource
from api.models import CouncilmanDebits


class CouncilmanDebitsResource(ModelResource):
    class Meta:
        queryset = CouncilmanDebits.objects.all()
        resource_name = 'CouncilmanDebits'

