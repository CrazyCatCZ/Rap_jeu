from django.urls import path
from .views import QuestionView, CreateRoomView

urlpatterns = [
    path('home', QuestionView.as_view()),
    path('create-room', CreateRoomView.as_view())
]