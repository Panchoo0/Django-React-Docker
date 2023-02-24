from django.shortcuts import render

# Create your views here.


from django.contrib.auth.models import User

from django.http import HttpResponse


def index(request):
    user = User.objects.filter(username="panchho")[0]
    print(user)
    # user = User.objects.create(username="panchho",pk=1)
    return HttpResponse(user)
