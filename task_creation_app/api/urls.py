""" URL Configuration for the task_creation_app API 
    
        Args:
                path (str): The URL path
                include (str): The URL include
        
        
                
        Raises:
                No exceptions
"""

from django.urls import path, include
from .views import TaskViewSet, UserViewSet
from .views import api_root

task_list = TaskViewSet.as_view({"get": "list", "post": "create"})
task_detail = TaskViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

user_list = UserViewSet.as_view({"get": "list", "post": "create"})
user_detail = UserViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)


urlpatterns = [
    path("root/", api_root, name="api-root"),
    path("tasks/", task_list, name="task-list"),
    path("tasks/<int:pk>/", task_detail, name="task-detail"),
    path("users/", user_list, name="user-list"),
    path("users/<int:pk>/", user_detail, name="user-detail"),
]
