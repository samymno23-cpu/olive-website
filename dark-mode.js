// ===== Dark Mode System =====

// Check for saved user preference or system preference
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode === 'enabled' || (!savedMode && systemDarkMode)) {
        enableDarkMode();
    }
}

// Enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    updateDarkModeIcon();
}

// Disable dark mode
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    updateDarkModeIcon();
}

// Toggle dark mode
function toggleDarkMode() {
    const isDarkMode = document.body.classList.contains('dark-mode');

    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }

    // Add animation effect
    document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
}

// Update dark mode icon
function updateDarkModeIcon() {
    const darkModeIcon = document.querySelector('.dark-mode-icon');
    if (darkModeIcon) {
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.textContent = '☀️';
        } else {
            darkModeIcon.textContent = '🌙';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('darkMode')) {
                if (e.matches) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            }
        });
    }
});
