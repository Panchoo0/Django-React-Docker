from django.urls import path
from . import views

urlpatterns = [
    path('', views.getTasksByUser),
    path('create', views.createTask),
    path('delete/<int:id>/', views.deleteTask),
    path('edit/<int:id>/', views.updateTask),

]