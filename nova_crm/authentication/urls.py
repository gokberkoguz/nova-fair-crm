from django.urls import path
from .views import LoginView

urlpatterns = [
    # Other URL patterns
    path('login/', LoginView.as_view(), name='login'),
]
