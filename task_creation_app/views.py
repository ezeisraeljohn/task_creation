from django.shortcuts import render


def index(request):
    """The view function for the index page"""
    return render(request, "task_creation_app/index.html")


def signup(request):
    """The view function for the signup page"""
    return render(request, "registration/signup.html")


def members(request):
    """The view function for the members page"""
    return render(request, "task_creation_app/members.html")
