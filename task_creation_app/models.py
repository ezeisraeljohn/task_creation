""" This module contains the Task model that defines how the tasks entered by
    users will be stored in the database

        Attributes:
                Task (class): The Task model that defines how the tasks entered 
                by
                users will be stored in the database

"""

from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    """The Task model that defines how the tasks entered by users will be
    stored in the database

    Args:
        models (Model): The Model class
    """

    STATUS_CHOICES = [
        ("progress", "In Progress"),
        ("completed", "Completed"),
        ("overdue", "Overdue"),
    ]

    PRIORITY = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    status = models.CharField(choices=STATUS_CHOICES, max_length=20)
    priority = models.CharField(choices=PRIORITY, max_length=20)
    due_date = models.DateTimeField()
    category = models.CharField(max_length=200)
    assigned_to = models.ForeignKey(
        User, related_name="tasks", on_delete=models.CASCADE, null=True
    )

    class Meta:
        ordering = ["due_date"]
        unique_together = ["title", "description", "due_date", "category"]

    def __str__(self):
        """The function that returns the title of the task

        Returns:
            str: The title of the task
        """
        return self.title
