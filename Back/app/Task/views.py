from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import TaskSerializer
from .models import Task


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTasksByUser(request):
    user = request.user
    tasks = user.task_set.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createTask(request):
    user = request.user
    print(request.data)
    if not request.data.get("Contenido"):
        return Response({"data": "Formato inválido"}, status=status.HTTP_400_BAD_REQUEST)
    content = request.data.get("Contenido")
    task = Task.objects.create(user=user,body=content)
    serializer = TaskSerializer(task)
    return Response({'message': 'Creada exitosamente', 'data':serializer.data})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteTask(request,id):
    user = request.user
    if not user.task_set.filter(id=id):
        return Response({"message":"No se encontró la tarea"}, status=status.HTTP_400_BAD_REQUEST)
    task = user.task_set.filter(id=id)
    task.delete()
    return Response({"message":"Se eliminó Correctamente"})

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def updateTask(request,id):
    user = request.user
    if not user.task_set.filter(id=id):
        return Response({"message":"No se encontró la tarea"}, status=status.HTTP_400_BAD_REQUEST)
    task = user.task_set.filter(id=id)
    if not request.data.get("data"):
        return Response({"message":"Falta el nuevo contenido"}, status=status.HTTP_400_BAD_REQUEST)
    if request.data.get("checked") == None:
         return Response({"message":"Falta el check"}, status=status.HTTP_400_BAD_REQUEST)
    task.update(body=request.data.get("data"), checked= request.data.get("checked"))
    return Response({"message":"Se modificó Correctamente"})