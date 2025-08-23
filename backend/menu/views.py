from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import MenuItem, Reservation
from .serializers import MenuItemSerializer, ReservationSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Reservation

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save the reservation object
        reservation = serializer.save()

        # --- Email Sending Logic ---
        subject = f"New Reservation from {reservation.full_name}"
        message_admin = f"""
        A new reservation has been made.

        Details:
        Name: {reservation.full_name}
        Email: {reservation.email}
        Phone: {reservation.phone_number}
        Guests: {reservation.number_of_guests}
        Time: {reservation.reservation_time}

        Selected Dishes:
        """
        for dish in reservation.selected_dishes:
            message_admin += f"- {dish.get('name', 'N/A')} (Qty: {dish.get('quantity', 1)})\n"

        # Send email to admin
        try:
            send_mail(
                subject=subject,
                message=message_admin,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=['your-admin-email@example.com'], # IMPORTANT: Change this to your admin email
            )

            # Send confirmation email to the customer
            message_customer = f"""
            Dear {reservation.full_name},

            Thank you for your reservation! We have successfully booked a table for you.

            Here are your booking details:
            Guests: {reservation.number_of_guests}
            Time: {reservation.reservation_time}

            We look forward to welcoming you.

            Sincerely,
            The Aethel Restaurant
            """
            send_mail(
                subject='Your Reservation Confirmation at Aethel',
                message=message_customer,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[reservation.email],
            )
        except Exception as e:
            # If email fails, the booking is still made. Log the error.
            print(f"Email sending failed: {e}")

        # --- Send Success Response to Frontend ---
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




@api_view(['GET'])
def new_reservation_count(request):
    if not request.user.is_staff:
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    count = Reservation.objects.filter(status='new').count()
    return JsonResponse({'new_reservation_count': count})