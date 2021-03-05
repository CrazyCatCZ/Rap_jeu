from django.urls import path
from .views import QuestionView, CreateRoomView, GetRoom, ReprendrePartieView, GetQuestions, PointRoomView, GetPuriste, GetMystere

urlpatterns = [
    path('home', QuestionView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('reprendre-room', ReprendrePartieView.as_view()),
    path('get-question', GetQuestions.as_view()),
    path('post-point', PointRoomView.as_view()),
    path('get-puriste', GetPuriste.as_view()),
    path('get-mystere', GetMystere.as_view())
]