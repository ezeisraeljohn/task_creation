from django.test import TestCase
from .models import Task, User
from datetime import datetime
import django
from django.core.exceptions import ValidationError
import os

# Set the environment variable for the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "task_creation.settings")

# Setup Django
django.setup()


class TaskTestCase(TestCase):
    """The class that defines the test cases for the Task app"""

    def setUp(self):

        self.user = User.objects.create_user(username="eze", password="testpassword")

        Task.objects.create(
            title="Test Task 1",
            description="This is a test task",
            status="New",
            priority="High",
            category="General",
            due_date=datetime.now(),
            assigned_to=self.user,
        )
        Task.objects.create(
            title="Test Task 2",
            description="This is another test task",
            status="In Progress",
            priority="Medium",
            category="General",
            due_date=datetime.now(),
            assigned_to=self.user,
        )

    def test_task_creation(self):
        """Test that tasks are created successfully"""
        task1 = Task.objects.get(priority="High")
        self.assertEqual(task1.priority, "High")

        task2 = Task.objects.get(priority="Medium")
        self.assertEqual(task2.priority, "Medium")

    def test_task_update(self):
        """Test that tasks are updated successfully"""
        task1 = Task.objects.get(priority="High")
        task1.priority = "Low"
        task1.save()
        self.assertEqual(task1.priority, "Low")

    def test_error_task_creation(self):
        """Test that tasks are not created with invalid data"""
        with self.assertRaises(ValidationError):
            Task.objects.create(
                title="Test Task 3",
                description="This is a test task",
                status="New",
                priority="High",
                category="General",
                due_date="datetime.now()",  # invalid date
                assigned_to=self.user,
            )

    def test_error_task_update(self):
        """Test that tasks are not updated with invalid data"""
        task1 = Task.objects.get(priority="High")
        with self.assertRaises(ValidationError):
            task1.due_date = "datetime.now()"  # invalid date
            task1.save()

    def test_task_deletion(self):
        """Test that tasks are deleted successfully"""
        tasks_before = Task.objects.count()
        task1 = Task.objects.get(priority="High")
        task1.delete()
        task_after = Task.objects.count()
        self.assertTrue(tasks_before > task_after)

    def test_task_search(self):
        """Test that tasks are searched successfully"""
        task1 = Task.objects.get(title="Test Task 1")
        task2 = Task.objects.get(title="Test Task 2")
        self.assertEqual(task1.title, "Test Task 1")
        self.assertEqual(task2.title, "Test Task 2")
        self.assertNotEqual(task1.title, "Test Task 2")
        self.assertNotEqual(task2.title, "Test Task 1")
