"""This module serializes the Task model to be able to convert the Task model
    to JSON format
        
    Attributes:
                SerializeTask (class): The class that serializes the
                Task model to JSON format
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Task
from email_validator import validate_email, EmailNotValidError


class SerializeTask(serializers.ModelSerializer):
    """The class that serializes the Task model to JSON format

    Args:
            serializers (Serializer): The Serializer class
    """

    class Meta:
        model = Task
        fields = "__all__"

    def validate_title(self, value):
        """The function that validates the title of the task

        Args:
                value (str): The title of the task

        Returns:
                str: The title of the task
        """
        if len(value) < 10:
            raise serializers.ValidationError(
                "The title must be at least 10 characters long"
            )
        return value

    def validate_category(self, value):
        """The function that validates the category of the task

        Args:
                attrs (str): The category of the task

        Returns:
                str: The category of the task
        """
        if len(value) > 20:
            raise serializers.ValidationError(
                "The category must be at least 10 characters long"
            )
        return value


class SerializeUser(serializers.ModelSerializer):
    """The class that serializes the User model to JSON format

    Args:
            serializers (Serializer): The Serializer class
    """

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password"]

        def validate_email(self, value):
            """The function that validates the email of the user

            Args:
                    value (str): The email of the user

            Returns:
                    str: The email of the user
            """
            try:
                validate_email(value)
            except EmailNotValidError as e:
                raise serializers.ValidationError(str(e))
            user = User.objects.filter(email=value)
            if user:
                raise serializers.ValidationError("The email is already taken")
            return value

    def validate_username(self, value):
        """The function that validates the username of the user

        Args:
                value (str): The username of the user

        Returns:
                str: The username of the user
        """
        user = User.objects.filter(username=value)
        if user:
            raise serializers.ValidationError("The username is already taken")
        return value
