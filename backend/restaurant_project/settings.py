from pathlib import Path
from decouple import config # IMPORTANT: Add this import at the top

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='django-insecure-fallback-key-for-dev')

# SECURITY WARNING: don't run with debug turned on in production!
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
        'DIRS': [BASE_DIR / 'templates'], # FIX 1: Added this to find your custom admin templates
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
STATIC_ROOT = BASE_DIR / "staticfiles" # FIX 2: Added this to fix the collectstatic error

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
]

# FIX 3: Secure Email Configuration using .env file
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_PASSWORD')

# Jazzmin Settings (No changes here, this is correct)
JAZZMIN_SETTINGS = {
    "site_title": "Aethel Admin",
    "site_header": "Aethel Restaurant",
    "site_brand": "Aethel Heritage",
    "welcome_sign": "Welcome to the Aethel Restaurant Admin Panel",
    "copyright": "Aethel Restaurant Ltd.",
    "custom_css": "css/jazzmin_custom.css",
    "show_ui_builder": True,
}

# restaurant_project/settings.py

# restaurant_project/settings.py

JAZZMIN_SETTINGS = {
    # Page titles
    "site_title": "Aethel Admin",
    "site_header": "Aethel",
    "site_brand": "Aethel Heritage",
    "welcome_sign": "Welcome to the Aethel Restaurant Admin Panel",
    "copyright": "Aethel Restaurant Ltd.",

    # Links to your custom CSS file
    "custom_css": "css/jazzmin_custom.css",
    "custom_js": "js/jazzmin_custom.js", # We'll create this file

    # Sidebar Icons
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "menu.menuitem": "fas fa-utensils",
        "menu.reservation": "fas fa-calendar-check",
    },

    # Sidebar Menu Structure
    "topmenu_links": [
        {"name": "Home",  "url": "admin:index", "permissions": ["auth.view_user"]},
        {"name": "Frontend", "url": "http://localhost:5173", "new_window": True}, # Link to your React app
    ],
    "usermenu_links": [
        {"name": "Frontend Site", "url": "http://localhost:5173", "new_window": True},
        {"model": "auth.user"}
    ],
    "side_menu_nav": [
        {"name": "Dashboard", "icon": "fas fa-tachometer-alt", "url": "admin:index"},
        {"name": "Reservations", "icon": "fas fa-calendar-check", "url": "admin:menu_reservation_changelist"},
        {"name": "Menu", "icon": "fas fa-utensils", "models": [
            {"name": "All Dishes", "url": "admin:menu_menuitem_changelist"},
            {"name": "Add New Dish", "url": "admin:menu_menuitem_add"},
        ]},
        {"name": "Administration", "icon": "fas fa-users-cog", "models": [
            {"name": "Users", "url": "admin:auth_user_changelist"},
            {"name": "Groups", "url": "admin:auth_group_changelist"},
        ]},
    ],
}


# ## Step 2: Create a .env File for Your Credentials
# Now, we'll store these credentials securely in your project.

# Install python-decouple: This package makes it easy to read variables from a file. In your terminal (with the virtual environment activated), run:

# Bash

# pip install python-decouple
# Create a .env file: In the root directory of your Django project (the same folder where manage.py is), create a new file named .env.

# Add your credentials to the .env file:

# Ini, TOML

# # .env file

# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=the-16-character-app-password-you-just-generated
# ADMIN_EMAIL=the-email-where-you-want-to-receive-notifications@example.com
# ## Step 3: Update settings.py and views.py
# Finally, let's tell Django to read these new, secure variables.

# Update restaurant_project/settings.py:

# Python

# # restaurant_project/settings.py
# from decouple import config # Add this import at the top

# # ... other settings ...

# # Email Configuration
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = config('EMAIL_USER')
# EMAIL_HOST_PASSWORD = config('EMAIL_PASSWORD')
# Update menu/views.py: Use the ADMIN_EMAIL variable so you don't have to hardcode your admin email in the view.

# Python

# # menu/views.py
# from decouple import config # Add this import

# # ... inside your ReservationViewSet's create method ...

# # Send email to admin
# send_mail(
#     subject=subject,
#     message=message_admin,
#     from_email=settings.EMAIL_HOST_USER,
#     recipient_list=[config('ADMIN_EMAIL')], # Use the variable here
# )
# # ...
# Now, restart your Django server. The next time a booking is made, Django will securely use your credentials from the .env file to send the notification emails.