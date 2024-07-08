""" Views for the Task app 
"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import SerializeTask, SerializeUser
from ..models import Task
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(["GET"])
def api_root(request, format=None):
    """The function that defines the root of the API"""
    return Response(
        {
            "tasks": reverse("task-list", request=request, format=format),
            "users": reverse("user-list", request=request, format=format),
        }
    )


class TaskViewSet(viewsets.ModelViewSet):
    """The class that defines the views for the Task app"""

    queryset = Task.objects.all()
    serializer_class = SerializeTask
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """The function that gets the queryset of the tasks

        Returns:
            QuerySet: The queryset of the tasks
        """
        queryset = Task.objects.filter(assigned_to=self.request.user)

        if self.request.query_params.get("status"):
            queryset = queryset.filter(status=self.request.query_params.get("status"))

        if self.request.query_params.get("priority"):
            queryset = queryset.filter(
                priority=self.request.query_params.get("priority")
            )
        if self.request.user.is_superuser:
            queryset = Task.objects.all()
        return queryset

    def perform_create(self, serializer):
        """The function that creates a task

        Args:
            serializer (SerializeTask): The serializer for the task
        """
        serializer.save(assigned_to=self.request.user)

    def perform_update(self, serializer):
        """The function that updates a task

        Args:
            serializer (SerializeTask): The serializer for the task
        """
        serializer.save(assigned_to=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    """The class that defines the views for the User app"""

    queryset = User.objects.all()
    serializer_class = SerializeUser
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """The function that gets the queryset of the users

        Returns:
            QuerySet: The queryset of the users
        """
        user = self.request.user
        if user.is_authenticated:
            if user.is_superuser:
                return User.objects.all()
            return User.objects.filter(username=user.username)

    def perform_create(self, serializer):
        """The function that creates a user

        Args:
                serializer (SerializeUser): The serializer for the user
        """
        serializer.save()

    def perform_update(self, serializer):
        """The function that updates a user

        Args:
                serializer (SerializeUser): The serializer for the user
        """
        serializer.save()
