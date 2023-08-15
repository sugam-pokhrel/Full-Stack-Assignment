import json
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Todo, Consumers
from .serializers import TodoSerializer,ConsumersSerializer

# Create your views here.

@api_view(["GET", "POST","PUT","DELETE","PATCH"])
def todo_list(request):
    if request.method ==  "GET":
        print(request.data)
        todos = Todo.objects.all().filter()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method=='PUT':
        todo_id = request.data.get('id')
        try:
            todo = Todo.objects.get(id=todo_id)
        except Todo.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        todo_id = request.data.get('id')
        
        try:
            todo = Todo.objects.get(id=todo_id)
        except Todo.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        




@api_view(["GET", "POST", "PUT", "DELETE"])
def todo_detail(request):
   if request.method ==  "GET":
        print(request.data)
        todos = Todo.objects.all().filter()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
   elif request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        print(request.data.get('name'))
        todos = Todo.objects.all().filter(createdBy=request.data.get('name'))
        if(todos):
            serializer = TodoSerializer(todos, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        

        
    



@api_view(["GET", "POST"])
def register(request):
    if request.method ==  "GET":
        todos = Consumers.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)    
   
    
    if request.method == "POST":
        serializer = ConsumersSerializer(data=request.data)
        
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
def login(request):
    name = request.data.get('name')
    
    data = Consumers.objects.filter(name=name,password=request.data.get('password'))
    
    if data:
        serializer = ConsumersSerializer(data, many=True)
        print(serializer.data)
        # Serialize the queryset
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST", "PUT", "DELETE"])
def delete(request):
   if request.method ==  "GET":
        print(request.data)
        todos = Todo.objects.all().filter()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
   elif request.method == "POST":
        
        todo_id = request.data.get('id')
        try:
            todo = Todo.objects.get(id=todo_id)
        except Todo.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        
