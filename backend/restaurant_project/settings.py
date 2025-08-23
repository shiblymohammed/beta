from pathlib import Path
from decouple import config # MUST be at the top
from decouple import config
import os
import cloudinary


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
SECRET_KEY = config('SECRET_KEY')
DEBUG = True
ALLOWED_HOSTS = []








# Application definition
INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'cloudinary',             # FIX 1: Added the missing 'cloudinary' app
    'cloudinary_storage',
    'menu',
    'bookings',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'restaurant_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'restaurant_project.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
]

# --- SECURE EMAIL CONFIGURATION ---
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_PASSWORD')

# --- SECURE CLOUDINARY CONFIGURATION ---
# --- SECURE CLOUDINARY CONFIGURATION (DEFINITIVE FIX) ---

## restaurant_project/settings.py

# --- SECURE CLOUDINARY CONFIGURATION (TEMPORARY DEBUGGING TEST) ---
import cloudinary

# Replace with your actual credentials from the Cloudinary Dashboard
CLOUDINARY_CLOUD_NAME = "dgq340o8w"
CLOUDINARY_API_KEY = "382429313389872"
CLOUDINARY_API_SECRET = "mu5cwV8tqFAnp24XHWgn5J1p0D8" # Make sure this is the correct, secret value

cloudinary.config(
    cloud_name = CLOUDINARY_CLOUD_NAME,
    api_key = CLOUDINARY_API_KEY,
    api_secret = CLOUDINARY_API_SECRET,
    secure = True
)

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'


# --- JAZZMIN SETTINGS (Consolidated into one correct block) ---
JAZZMIN_SETTINGS = {
    "site_title": "Aethel Admin",
    "site_header": "Aethel",
    "site_brand": "Aethel Heritage",
    "welcome_sign": "Welcome to the Aethel Restaurant Admin Panel",
    "copyright": "Aethel Restaurant Ltd.",
    "custom_css": "css/jazzmin_custom.css",
    "custom_js": "js/jazzmin_custom.js",
    "show_ui_builder": True,
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "menu.menuitem": "fas fa-utensils",
        "menu.reservation": "fas fa-calendar-check",
        "bookings.roombooking": "fas fa-bed", # Added icon for room bookings
    },
    "topmenu_links": [
        {"name": "Home",  "url": "admin:index", "permissions": ["auth.view_user"]},
        {"name": "Frontend", "url": "http://localhost:5173", "new_window": True},
    ],
    "usermenu_links": [
        {"name": "Frontend Site", "url": "http://localhost:5173", "new_window": True},
        {"model": "auth.user"}
    ],
    "side_menu_nav": [
        {"name": "Dashboard", "icon": "fas fa-tachometer-alt", "url": "admin:index"},
        {"name": "Dining Reservations", "icon": "fas fa-calendar-check", "url": "admin:menu_reservation_changelist"},
        {"name": "Room Bookings", "icon": "fas fa-bed", "url": "admin:bookings_roombooking_changelist"},
        {"name": "Menu Management", "icon": "fas fa-utensils", "models": [
            {"name": "All Dishes", "url": "admin:menu_menuitem_changelist"},
            {"name": "Add New Dish", "url": "admin:menu_menuitem_add"},
        ]},
        {"name": "Administration", "icon": "fas fa-users-cog", "models": [
            {"name": "Users", "url": "admin:auth_user_changelist"},
            {"name": "Groups", "url": "admin:auth_group_changelist"},
        ]},
    ],
}

JAZZMIN_UI_TWEAKS = {
    "theme": "litera",
    "dark_mode_theme": None,
    "main_bg": "#FBF9F6",
    "navbar": "navbar-white navbar-light",
    "sidebar": "sidebar-light-primary",
    # ... (rest of your UI tweaks are fine) ...
}