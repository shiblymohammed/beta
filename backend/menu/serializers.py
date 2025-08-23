# menu/serializers.py

from rest_framework import serializers
from .models import MenuItem, Reservation

class MenuItemSerializer(serializers.ModelSerializer):
    # This new field will hold the full URL of the image
    image = serializers.URLField(source='image.url')

    class Meta:
        model = MenuItem
        # We now use the 'image' field which we've defined above
        fields = ['id', 'name', 'description', 'price', 'image', 'is_signature', 'is_daily']

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'