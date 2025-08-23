# bookings/serializers.py

from rest_framework import serializers
from .models import RoomBooking # Corrected Import

class RoomBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomBooking
        fields = '__all__'