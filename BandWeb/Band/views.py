from django.shortcuts import render


# Create your views here.
def index(request):
    """
    index page
    :param request:
    :return:
    """
    return render(request=request, template_name='index.html')


def about(request):
    """
    about page
    :param request:
    :return:
    """
    return render(request=request, template_name='about.html')


def contact(request):
    """
    contact page
    :param request:
    :return:
    """
    return render(request=request, template_name='contact.html')


def live(request):
    """
    live page
    :param request:
    :return:
    """
    return render(request=request, template_name='live.html')


def photos(request):
    """
    photos page
    :param request:
    :return:
    """
    return render(request=request, template_name='photos.html')


def submit(request):
    """
    submit page
    :param request:
    :return:
    """
    return render(request=request, template_name='submit.html')
