from django.urls import path
from . import views

urlpatterns = [
    path('create_user', views.createUser),
    path('logout', views.logoutUser),
]