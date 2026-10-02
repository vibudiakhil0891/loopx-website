from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/", include("contact.urls")),

    path(
        "api/owner/login/",
        TokenObtainPairView.as_view(),
        name="owner-login",
    ),

    path(
        "api/owner/token/refresh/",
        TokenRefreshView.as_view(),
        name="token-refresh",
    ),
]