from django.urls import path 
from . import views 


urlpatterns = [
    path("todos", views.todo_list),
    path("hello", views.todo_detail),
    path("register", views.register),
    path('login', views.login),
    path('delete', views.delete),
]
