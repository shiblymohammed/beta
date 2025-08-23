# bookings/views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from decouple import config

# Corrected Imports: Only import what this app needs
from .models import RoomBooking
from .serializers import RoomBookingSerializer

class RoomBookingViewSet(viewsets.ModelViewSet):
    queryset = RoomBooking.objects.all()
    serializer_class = RoomBookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()

        # --- Room Booking Email Logic ---
        subject = f"New Room Booking from {booking.full_name}"
        
        rooms_list_str = ""
        for room_id, quantity in booking.selected_rooms.items():
            rooms_list_str += f"- Room ID {room_id} (Quantity: {quantity})\n"

        message_admin = f"""
        A new room booking has been made.

        Guest Details:
        Name: {booking.full_name}
        Email: {booking.email}
        Phone: {booking.phone}

        Booking Details:
        Check-in: {booking.check_in}
        Check-out: {booking.check_out}
        Nights: {booking.nights}
        Guests: {booking.adults} Adults, {booking.children} Children

        Total Price: ₹{booking.total_price}

        Selected Rooms:
        {rooms_list_str}
        """
        
        try:
            send_mail(
                subject=subject,
                message=message_admin,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[config('ADMIN_EMAIL')],
            )
        except Exception as e:
            print(f"Room booking email failed to send: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)