from django.shortcuts import render
from rest_framework import generics, status
from .serializers import QuestionSerializer, CreateRoomSerializer, RoomSerializer
from .models import Questions, Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class QuestionView(generics.CreateAPIView):
    queryset = Questions.objects.all()
    serializer_class = QuestionSerializer

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
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, equipeA=equipeA,
                            equipeB=equipeB)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
        


