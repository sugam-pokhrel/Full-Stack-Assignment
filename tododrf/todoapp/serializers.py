from rest_framework import serializers
from .models import Todo, Consumers


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo 
        fields = ["id", "task", "completed", "createdBy"]

class ConsumersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumers
        fields = ["id", "name", "password"]
