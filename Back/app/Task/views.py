from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import TaskSerializer
from .models import Task


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTasksByUser(request):
    user = request.user
    tasks = user.task_set.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)
