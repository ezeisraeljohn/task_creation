from django.urls import path, include
from .views import index, signup, members


urlpatterns = [
    path("accounts/login/", include("django.contrib.auth.urls"), name="login"),
    path("accounts/", include("django.contrib.auth.urls")),
    path("", view=index, name="index"),
    path("signup/", view=signup, name="signup"),
    path("members/", view=members, name="members"),
]
