from django.db import models

# Create your models here.



class Customer(models.Model):
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    serviceAddress = models.CharField(max_length=255)
    createAt = models.CharField(max_length=255)
    type = models.CharField(default='person', max_length=255)
    score = models.CharField(default='other', max_length=255)
    remark = models.CharField(default='', max_length=255)