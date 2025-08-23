# menu/admin.py

from django.contrib import admin
from django.utils.html import format_html
from .models import MenuItem, Reservation

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'is_daily', 'is_signature')
    list_filter = ('is_daily', 'is_signature')
    search_fields = ('name', 'description')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'reservation_time', 'booking_date', 'display_dishes', 'status_tag')
    list_filter = ('status', 'booking_date', 'reservation_time')
    search_fields = ('full_name', 'email', 'phone_number')

    # Add a custom action
    actions = ['mark_as_confirmed']

    readonly_fields = ('display_dishes_details', 'booking_date',)

    fieldsets = (
        (None, {
            'fields': ('full_name', 'email', 'phone_number', 'number_of_guests', 'reservation_time', 'status')
        }),
        ('Details', {
            'fields': ('booking_date', 'display_dishes_details',),
        }),
    )

    # Function for the color-coded status tag
    def status_tag(self, obj):
        color_map = {
            'new': 'primary',
            'confirmed': 'success',
            'completed': 'secondary',
            'cancelled': 'danger',
        }
        color = color_map.get(obj.status, 'light')
        return format_html(f'<span class="badge badge-{color}">{obj.get_status_display()}</span>')
    status_tag.short_description = 'Status'

    # Function for the custom action
    def mark_as_confirmed(self, request, queryset):
        queryset.update(status='confirmed')
    mark_as_confirmed.short_description = "Mark selected reservations as Confirmed"

    # Function to display dishes in the list view
    def display_dishes(self, obj):
        return f"{len(obj.selected_dishes)} items"
    display_dishes.short_description = 'Selected Dishes'

    # Function to display dish details in the form view
    def display_dishes_details(self, obj):
        html = "<ul>"
        for dish in obj.selected_dishes:
            html += f"<li>{dish.get('name')} (Qty: {dish.get('quantity')})</li>"
        html += "</ul>"
        return format_html(html)
    display_dishes_details.short_description = 'Order Details'