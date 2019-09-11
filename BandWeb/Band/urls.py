from django.conf.urls import url
from Band.views import index, about, contact, live, photos, submit

urlpatterns = [
    url(r'^$', index, name="index"),
    url(r'^index.html$', index, name="index"),
    url(r'^about.html$', about, name="about"),
    url(r'^contact.html$', contact, name="contact"),
    url(r'^live.html$', live, name="live"),
    url(r'^photos.html$', photos, name="photos"),
    url(r'^submit.html$', submit, name="submit"),
]