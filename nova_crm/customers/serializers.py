from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Customer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    mail = serializers.CharField(required=True)
    sector = serializers.CharField(required=True)
    city = serializers.CharField(required=True)
    contact_name = serializers.CharField(required=False, allow_null=True)
    contact_email = serializers.CharField(required=False, allow_null=True)
    contact_phone = serializers.CharField(required=False, allow_null=True)
    assigned_employee = serializers.CharField(required=False, allow_null=True)

    class Meta:
        model = Customer
        fields = ['id', 'name', 'phone','mail','sector','city','contact_name','contact_email','contact_phone', 'assigned_employee']

    def validate_assigned_employee(self, value):
        """
        Validate the assigned_employee field.
        """
        if value is None:
            return None

        try:
            user = User.objects.get(username=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid username.")

        return user

    def update(self, instance, validated_data):
        """
        Update the customer instance with the validated data.
        """
        assigned_employee = validated_data.pop('assigned_employee', None)
        if assigned_employee is not None:
            instance.assigned_employee = assigned_employee

        return super().update(instance, validated_data)



