from django.db import models

# Create your models here.
class RoomBooking(models.Model):
    # Guest Info
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    special_requests = models.TextField(blank=True, null=True)

    # Booking Details
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.IntegerField(default=1)
    children = models.IntegerField(default=0)

    # Price & Room Info
    selected_rooms = models.JSONField(default=dict)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    nights = models.IntegerField(default=1)

    # Timestamps
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Room Booking for {self.full_name} on {self.check_in}"