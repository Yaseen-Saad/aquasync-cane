
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sliders
    initializeSliders();
    
    // Initialize all toggles
    initializeToggles();
    
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize profile image upload
    initializeProfileUpload();
});

// Slider Initialization
function initializeSliders() {
    const sliders = document.querySelectorAll('.modern-slider');
    
    sliders.forEach(slider => {
        const display = slider.parentElement.querySelector('.value-display');
        
        // Update display on slider change
        slider.addEventListener('input', function() {
            let value = this.value;
            if (this.id === 'update-frequency') {
                display.textContent = `${value}s`;
            } else if (this.id === 'alert-threshold') {
                display.textContent = `${value}%`;
            }
            
            // Add ripple effect
            addRippleEffect(this);
        });
    });
}

// Toggle Switch Initialization
function initializeToggles() {
    const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id;
            const isEnabled = this.checked;
            
            // Save setting to localStorage
            localStorage.setItem(settingName, isEnabled);
            
            // Show feedback animation
            showFeedback(this.parentElement.parentElement, isEnabled);
            
            // Handle special cases
            handleSpecialToggles(settingName, isEnabled);
        });
        
        // Load saved state
        const savedState = localStorage.getItem(toggle.id);
        if (savedState !== null) {
            toggle.checked = savedState === 'true';
        }
    });
}

// Dark Mode Implementation
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-theme', this.checked);
            localStorage.setItem('darkMode', this.checked);
        });
        
        // Load saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-theme');
        }
    }
}

// Profile Image Upload
function initializeProfileUpload() {
    const editButton = document.querySelector('.edit-profile-btn');
    const profileImg = document.querySelector('.profile-image img');
    
    if (editButton && profileImg) {
        editButton.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        profileImg.src = event.target.result;
                        // Save to localStorage (you might want to use a proper backend instead)
                        localStorage.setItem('profileImage', event.target.result);
                        showSuccessMessage('Profile picture updated successfully!');
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
        
        // Load saved profile image
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            profileImg.src = savedImage;
        }
    }
}

// Visual Feedback Functions
function showFeedback(element, isSuccess) {
    element.classList.add('feedback');
    element.classList.add(isSuccess ? 'success' : 'error');
    
    setTimeout(() => {
        element.classList.remove('feedback', 'success', 'error');
    }, 500);
}

function addRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast', 'success');
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Special Toggle Handlers
function handleSpecialToggles(settingName, isEnabled) {
    switch(settingName) {
        case 'notifications-toggle':
            // Toggle all notification settings
            const notificationToggles = [
                'alert-notifications',
                'maintenance-reminders',
                'performance-reports'
            ];
            notificationToggles.forEach(id => {
                const toggle = document.getElementById(id);
                if (toggle) {
                    toggle.checked = isEnabled;
                    localStorage.setItem(id, isEnabled);
                }
            });
            break;
            
        case 'two-factor-auth':
            if (isEnabled) {
                // Show 2FA setup modal (you would implement this)
                showSuccessMessage('Two-factor authentication enabled');
            }
            break;
            
        case 'auto-maintenance':
            if (isEnabled) {
                // Update maintenance schedule (you would implement this)
                showSuccessMessage('Auto-maintenance schedule updated');
            }
            break;
    }
}

// Add event listeners for select elements
document.querySelectorAll('.modern-select').forEach(select => {
    select.addEventListener('change', function() {
        localStorage.setItem(this.id, this.value);
        showSuccessMessage(`${this.previousElementSibling.textContent} updated to ${this.value}`);
    });
    
    // Load saved values
    const savedValue = localStorage.getItem(select.id);
    if (savedValue) {
        select.value = savedValue;
    }
}); 