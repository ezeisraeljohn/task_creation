from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .forms import UserCreationForm


@login_required(login_url="/accounts/login/")
def dashboard(request):
    """The view function for the index page"""
    return render(request, "task_creation_app/dashboard.html", {})


def signup(request):
    """The view function for the signup page"""
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(
                request, "Account created successfully. You can now log in."
            )
            return redirect(reverse("login"))
    else:
        form = UserCreationForm()
    return render(request, "registration/signup.html", context={"form": form})


@login_required(login_url="/accounts/login/")
def members(request):
    """The view function for the members page"""
    return render(request, "task_creation_app/members.html")
