from django.urls import path
from .views import QuestionView, CreateRoomView, GetRoom

urlpatterns = [
    path('home', QuestionView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view())
]