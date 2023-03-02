from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from Api.serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
def createUser(request):
    if User.objects.filter(username=request.data["username"]):
        return Response({'data': 'El nombre de usuario se encuentra en uso'}, status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(
        username=request.data["username"], password=request.data["password"])
    tokens = MyTokenObtainPairSerializer.get_token(user)
    return Response({'refresh': str(tokens), 'access': str(tokens.access_token)})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logoutUser(request):
    refresh_token = request.data["refresh"]
    token = RefreshToken(refresh_token)
    token.blacklist()
    return Response(status=status.HTTP_205_RESET_CONTENT)
