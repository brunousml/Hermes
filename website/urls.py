from django.conf.urls import url
from django.conf.urls.static import static

from Hermes import settings
from . import views

app_name = 'website'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about$', views.about, name='about'),
    url(r'^contact$', views.contact, name='contact'),
    url(r'^get_dashboard_values$', views.get_dashboard_values, name='get_dashboard_values'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
