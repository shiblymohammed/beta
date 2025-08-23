# menu/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet, ReservationViewSet, new_reservation_count

router = DefaultRouter()
router.register(r'menu', MenuItemViewSet)
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('notifications/new-reservations/', new_reservation_count, name='new-reservation-count'), # Add this line
]