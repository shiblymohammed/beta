# bookings/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoomBookingViewSet

router = DefaultRouter()
router.register(r'room-bookings', RoomBookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]