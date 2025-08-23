from django.contrib import admin
from .models import RoomBooking

@admin.register(RoomBooking)
class RoomBookingAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'check_in', 'check_out', 'total_price', 'booking_date')
    list_filter = ('check_in', 'check_out')
    search_fields = ('full_name', 'email', 'phone')
    readonly_fields = ('booking_date',)