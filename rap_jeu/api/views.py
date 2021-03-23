from django.shortcuts import render
from rest_framework import generics, status
from .serializers import QuestionSerializer, CreateRoomSerializer, RoomSerializer, PointRoomSerializer
from .models import Questions, Room
from rest_framework.views import APIView
from rest_framework.response import Response
import random

# Create your views here.

class QuestionView(generics.ListAPIView):
    queryset = Questions.objects.all()
    serializer_class = QuestionSerializer

class DeleteQuestion(APIView):
    def get(self, request, format=None):
        # Questions.objects.filter(id=188).delete()
        # ToModify = Questions.objects.filter(id=43)
        # Recep = ToModify[0]
        # Recep.QuestionType = 87
        # Recep.question = "Thème : Rappeurs Français/US ou autres qui possèdent une marque de vêtements"
        # Recep.save(update_fields=['QuestionType'])
        # Recep.save(update_fields=['réponse'])
        # return Response(Recep.id, status=status.HTTP_200_OK)

        Tomodify = Questions.objects.filter(explication="Rap Genius ou Rap Gênant: Cette Punchline existe-t-elle ou pas ? (Si l'équipe qui prend la main répond mal les point reviennent à l'autre équipe)")

        for i in Tomodify:
            i.explication = "Rap Genius ou Rap Gênant: Cette Punchline existe-t-elle ou pas ? (Si l'équipe qui prend la main répond mal le point revient à l'autre équipe)"
            i.save(update_fields=['explication'])

        # ToModify = Questions.objects.filter(explication="Le Raptionaire : Le but est de trouver la signification de mot lié au rap")
        # for Q in ToModify:
        #     Q.explication = "Le Raptionaire: Le but est de trouver la signification de mot lié au rap"
        #     Q.save(update_fields=['explication'])
        # return Response(Q.id, status=status.HTTP_200_OK)

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            equipeA = serializer.data.get('equipeA')
            equipeB = serializer.data.get('equipeB')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.equipeA = equipeA
                room.equipeB = equipeB
                room.pointA = 0
                room.pointB = 0
                room.nbQuestion = 0
                room.save(update_fields=['equipeA', 'equipeB', 'pointA', 'pointB', 'nbQuestion'])
                QuestionFait = []
                self.request.session['question_fait'] = QuestionFait
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, equipeA=equipeA,
                            equipeB=equipeB)
                room.save()
                QuestionFait = []
                self.request.session['question_fait'] = QuestionFait
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)



class PointRoomView(APIView):
    serializer_class = PointRoomSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            pointA = serializer.data.get('pointA')
            pointB = serializer.data.get('pointB')
            nbQuestion = serializer.data.get('nbQuestion')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.pointA = pointA
                room.pointB = pointB
                room.nbQuestion = nbQuestion
                room.save(update_fields=['pointA', 'pointB', 'nbQuestion'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)



class ReprendrePartieView(APIView):
    def post(self, request, format=None):
        if self.request.session.exists(self.request.session.session_key):
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Aucune Partie en cours'}, status=status.HTTP_400_BAD_REQUEST)
    
        
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetQuestions(APIView):
    
    
    def get(self, request, format=None):
        RecepQuestionFait = self.request.session['question_fait']

        serializer_class = QuestionSerializer
        QuestionsRequest = Questions.objects.all()
        limRandom = len(QuestionsRequest)
        MysteryNum = [66, 77, 55, 22, 87]

        while True:   
            RandomNumQuestion = random.randint(24, limRandom)
            question = Questions.objects.filter(id=RandomNumQuestion).exclude(QuestionType__in=MysteryNum)
            if len(question) > 0 and question[0].id not in RecepQuestionFait:
                break

        RecepQuestionFait.append(question[0].id)
        self.request.session['question_fait'] = RecepQuestionFait

        data = QuestionSerializer(question[0]).data
        return Response(data, status=status.HTTP_200_OK)

class GetPuriste(APIView):
    
    
    def get(self, request, format=None):
        RecepQuestionFait = self.request.session['question_fait']

        serializer_class = QuestionSerializer
        QuestionsRequest = Questions.objects.filter(QuestionType=66).exclude(id__in=RecepQuestionFait)
        Box = []
        for Q in QuestionsRequest:
            Box.append(Q.id)
        limRandom = len(Box) - 1
            

        while True:   
            RandomNumQuestion = random.randint(0, limRandom)
            question = Questions.objects.filter(id=Box[RandomNumQuestion]).exclude(id__in=RecepQuestionFait)
            if len(question) > 0:
                break

        RecepQuestionFait.append(question[0].id)
        self.request.session['question_fait'] = RecepQuestionFait

        data = QuestionSerializer(question[0]).data
        return Response(data, status=status.HTTP_200_OK)

class GetMystere(APIView):
    
    
    def get(self, request, format=None):
        RecepQuestionFait = self.request.session['question_fait']

        serializer_class = QuestionSerializer
        QuestionsRequest = Questions.objects.filter(QuestionType=87).exclude(id__in=RecepQuestionFait)
        Box = []
        for Q in QuestionsRequest:
            Box.append(Q.id)
        limRandom = len(Box) - 1
            

        while True:   
            RandomNumQuestion = random.randint(0, limRandom)
            question = Questions.objects.filter(id=Box[RandomNumQuestion]).exclude(id__in=RecepQuestionFait)
            if len(question) > 0:
                break

        RecepQuestionFait.append(question[0].id)
        self.request.session['question_fait'] = RecepQuestionFait

        data = QuestionSerializer(question[0]).data
        return Response(data, status=status.HTTP_200_OK)

class GetEnchere(APIView):
    
    
    def get(self, request, format=None):
        RecepQuestionFait = self.request.session['question_fait']

        serializer_class = QuestionSerializer
        QuestionsRequest = Questions.objects.filter(QuestionType=55).exclude(id__in=RecepQuestionFait)
        Box = []
        for Q in QuestionsRequest:
            Box.append(Q.id)
        limRandom = len(Box) - 1
            

        while True:   
            RandomNumQuestion = random.randint(0, limRandom)
            question = Questions.objects.filter(id=Box[RandomNumQuestion]).exclude(id__in=RecepQuestionFait)
            if len(question) > 0:
                break

        RecepQuestionFait.append(question[0].id)
        self.request.session['question_fait'] = RecepQuestionFait

        data = QuestionSerializer(question[0]).data
        return Response(data, status=status.HTTP_200_OK)
    
class GetRolandGamos(APIView):
    
    
    def get(self, request, format=None):
        RecepQuestionFait = self.request.session['question_fait']

        serializer_class = QuestionSerializer
        QuestionsRequest = Questions.objects.filter(QuestionType=22).exclude(id__in=RecepQuestionFait)
        Box = []
        for Q in QuestionsRequest:
            Box.append(Q.id)
        limRandom = len(Box) - 1
            

        while True:   
            RandomNumQuestion = random.randint(0, limRandom)
            question = Questions.objects.filter(id=Box[RandomNumQuestion]).exclude(id__in=RecepQuestionFait)
            if len(question) > 0:
                break

        RecepQuestionFait.append(question[0].id)
        self.request.session['question_fait'] = RecepQuestionFait

        data = QuestionSerializer(question[0]).data
        return Response(data, status=status.HTTP_200_OK)
