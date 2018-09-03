from django.urls import path
from . import views

urlpatterns = [
    path ('<slug:username>/', views.ProfileView.as_view(), name="ProfileView"),
]
