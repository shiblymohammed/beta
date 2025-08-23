// static/js/jazzmin_custom.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Logic for the contextual action bar (No changes here) ---
    const actionCheckboxes = document.querySelectorAll('.action-select');
    const contextualActionBar = document.getElementById('contextual-action-bar');
    const selectedCounter = document.getElementById('selected-counter');
    const mainActionButton = document.querySelector('#changelist-form button[name="index"]');

    if (actionCheckboxes.length && contextualActionBar && mainActionButton) {
        mainActionButton.style.display = 'none';
        function updateActionBar() {
            const selectedCount = document.querySelectorAll('.action-select:checked').length;
            if (selectedCount > 0) {
                contextualActionBar.classList.add('active');
                selectedCounter.textContent = `${selectedCount} selected`;
            } else {
                contextualActionBar.classList.remove('active');
            }
        }
        actionCheckboxes.forEach(box => box.addEventListener('change', updateActionBar));
    }

    // --- Logic to style the filters (No changes here) ---
    const filterDiv = document.getElementById('changelist-filter');
    if (filterDiv) {
        filterDiv.querySelectorAll('h3').forEach(h3 => h3.classList.add('filter-title'));
        filterDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('filter-list'));
    }

    // --- NEW & IMPROVED: Logic for Notification Bell ---
    const notificationBell = document.getElementById('notification-bell-icon');
    const notificationDot = document.getElementById('notification-dot');
    const muteButton = document.getElementById('notification-mute-btn');
    const volumeIcon = document.getElementById('volume-icon');
    const notificationAudio = new Audio('/static/sounds/notification.mp3');

    let lastKnownCount = -1; // Start at -1 to ensure the first fetch can trigger a sound
    let isMuted = localStorage.getItem('notificationsMuted') === 'true';
    let audioInitialized = false;

    if (notificationBell && notificationDot && muteButton && volumeIcon) {
        // Function to initialize audio on first user interaction
        function initializeAudio() {
            if (!audioInitialized) {
                notificationAudio.play().then(() => {
                    notificationAudio.pause();
                    notificationAudio.currentTime = 0;
                }).catch(e => {}); // Silently fail if autoplay is blocked initially
                audioInitialized = true;
                document.body.removeEventListener('click', initializeAudio, true);
            }
        }
        document.body.addEventListener('click', initializeAudio, { once: true, capture: true });

        // Update Mute Button UI
        function updateMuteButton() {
            if (isMuted) {
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
                muteButton.title = "Unmute Notifications";
            } else {
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
                muteButton.title = "Mute Notifications";
            }
        }

        // Mute button click handler
        muteButton.addEventListener('click', (e) => {
            e.preventDefault();
            isMuted = !isMuted;
            localStorage.setItem('notificationsMuted', isMuted);
            updateMuteButton();
        });

        const checkNotifications = async () => {
            try {
                const response = await fetch('/api/notifications/new-reservations/');
                if (!response.ok) return;

                const data = await response.json();
                const newCount = data.new_reservation_count;

                // Set initial count on first load without playing sound
                if (lastKnownCount === -1) {
                    lastKnownCount = newCount;
                }

                if (newCount > 0) {
                    notificationDot.textContent = newCount;
                    notificationDot.style.display = 'block';
                    
                    // Play sound only if count has increased, not muted, and audio is ready
                    if (newCount > lastKnownCount && !isMuted && audioInitialized) {
                        notificationBell.classList.add('swing');
                        notificationAudio.play().catch(e => console.error("Audio play failed:", e));
                        setTimeout(() => notificationBell.classList.remove('swing'), 1000);
                    }
                } else {
                    notificationDot.style.display = 'none';
                }
                
                lastKnownCount = newCount;

            } catch (error) {
                console.error("Error checking notifications:", error);
            }
        };

        // Initialize and run
        updateMuteButton();
        checkNotifications();
        setInterval(checkNotifications, 15000); // Check every 15 seconds
    }
});