from django.conf.urls import url
from django.conf.urls.static import static

from Hermes import settings
from . import views

app_name = 'website'

urlpatterns = [
    url(r'^$', views.index, name='index'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns + + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)