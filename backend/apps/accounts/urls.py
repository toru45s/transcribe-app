from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, CustomTokenRefreshView, MeView

urlpatterns = [
    path("me/", MeView.as_view(), name="me"),
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
]