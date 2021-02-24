from django.db import models
import string
import random

# Create your models here.
class Questions(models.Model):
    question = models.CharField(max_length=1000, default="", unique=False)
    réponse = models.CharField(max_length=1000, default="", unique=False)
    QuestionType = models.IntegerField(null=False, default=1)
    explication = models.CharField(max_length=1000, default="", unique=False)
    choix1 = models.CharField(max_length=1000, default="", unique=False)
    choix2 = models.CharField(max_length=1000, default="", unique=False)
    choix3 = models.CharField(max_length=1000, default="", unique=False)
    choix4 = models.CharField(max_length=1000, default="", unique=False)

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True, default="")
    equipeA = models.CharField(max_length=16, unique=False)
    equipeB = models.CharField(max_length=16, unique=False)
    pointA = models.IntegerField(null=False, default=0)
    pointB = models.IntegerField(null=False, default=0)
    nbQuestion = models.IntegerField(null=False, default=1)
     
