from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Customer(models.Model):

    name = models.CharField(max_length=255, null=False, unique=True)
    phone = models.CharField(max_length=20, null=False)
    mail = models.CharField(max_length=255, null=False)
    sector = models.CharField(max_length=255,null=False)
    city = models.CharField(max_length=255, null=False)
    contact_name = models.CharField(max_length=255,null=True, blank=True)
    contact_email = models.CharField(max_length=255,null=True, blank=True)
    contact_phone = models.CharField(max_length=255,null=True, blank=True)
    assigned_employee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name
