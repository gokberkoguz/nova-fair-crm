from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Customer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    sector = serializers.CharField(required=True)
    assigned_employee = UserSerializer(required=False, allow_null=True)

    class Meta:
        model = Customer
        fields = ['id', 'name', 'sector', 'assigned_employee']

