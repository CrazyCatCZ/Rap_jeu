from rest_framework import serializers
from .models import Questions, Room

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ('id', 'question', 'réponse', 'QuestionType', 'explication', 'choix1', 'choix2', 'choix3', 'choix4', 'musique')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'equipeA',
                  'equipeB', 'pointA', 'pointB', 'nbQuestion')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('equipeA', 'equipeB')