from django.db import models

# Create your models here.

class Todo(models.Model):
    task=models.CharField(max_length=100)
    completed=models.BooleanField(default=False)
    createdBy=models.CharField(max_length=100)

    def __str__(self):
        return self.task
    
class Consumers(models.Model):
    name=models.CharField(max_length=100,unique=True)
    password=models.CharField(max_length=100)
    def __str__(self):
        return self.name