from django import template
from menu.models import Reservation, MenuItem
from django.utils import timezone

register = template.Library()

@register.simple_tag
def get_todays_reservations_count():
    today = timezone.now().date()
    return Reservation.objects.filter(booking_date__date=today).count()

@register.simple_tag
def get_new_reservations():
    return Reservation.objects.filter(status='new').order_by('-booking_date')[:5]

@register.simple_tag
def get_total_menu_items():
    return MenuItem.objects.count()