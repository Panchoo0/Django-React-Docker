from django.urls import path, include
from . import views, serializers

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView
)

urlpatterns = [
    path('token/', serializers.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('tasks/', include('Task.urls'))
]