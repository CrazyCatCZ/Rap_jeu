# Generated by Django 3.1.6 on 2021-02-23 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(default='', max_length=1000)),
                ('réponse', models.CharField(default='', max_length=1000)),
                ('QuestionType', models.IntegerField(default=1)),
                ('explication', models.CharField(default='', max_length=1000)),
                ('choix1', models.CharField(default='', max_length=1000)),
                ('choix2', models.CharField(default='', max_length=1000)),
                ('choix3', models.CharField(default='', max_length=1000)),
                ('choix4', models.CharField(default='', max_length=1000)),
            ],
        ),
    ]
