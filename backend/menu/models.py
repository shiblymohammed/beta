from django.db import models
from cloudinary.models import CloudinaryField

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = CloudinaryField('image', default='placeholder.jpg')
    is_signature = models.BooleanField(default=False)
    is_daily = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Reservation(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    number_of_guests = models.IntegerField()
    reservation_time = models.CharField(max_length=10)
    selected_dishes = models.JSONField(default=list)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new')
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reservation for {self.full_name} on {self.booking_date.strftime('%Y-%m-%d')}"