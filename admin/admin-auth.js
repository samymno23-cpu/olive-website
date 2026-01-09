// ===== Authentication System =====

// Check if user is already logged in
if (window.location.pathname.includes('login.html') && localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'dashboard.html';
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        const errorMessage = document.getElementById('errorMessage');

        // Load admin credentials from database
        fetch('../data/db.json')
            .then(response => response.json())
            .then(data => {
                const admin = data.admin;

                if (username === admin.username && password === admin.password) {
                    // Successful login
                    localStorage.setItem('adminLoggedIn', 'true');
                    localStorage.setItem('adminUsername', username);

                    if (remember) {
                        localStorage.setItem('adminRemember', 'true');
                    }

                    // Show success and redirect
                    errorMessage.style.display = 'none';
                    window.location.href = 'dashboard.html';
                } else {
                    // Failed login
                    errorMessage.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
                    errorMessage.style.display = 'block';

                    // Shake animation
                    loginForm.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        loginForm.style.animation = '';
                    }, 500);
                }
            })
            .catch(error => {
                errorMessage.textContent = 'حدث خطأ في الاتصال بالخادم';
                errorMessage.style.display = 'block';
                console.error('Login error:', error);
            });
    });
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Logout Handler
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminRemember');
        window.location.href = 'login.html';
    }
}

// Protect admin pages
function protectPage() {
    if (!window.location.pathname.includes('login.html')) {
        if (!localStorage.getItem('adminLoggedIn')) {
            window.location.href = 'login.html';
        }
    }
}

// Check authentication on page load
if (!window.location.pathname.includes('login.html')) {
    protectPage();
}

// Set admin username in header
document.addEventListener('DOMContentLoaded', function() {
    const adminUsername = localStorage.getItem('adminUsername');
    const usernameElements = document.querySelectorAll('.admin-username');

    if (adminUsername && usernameElements.length > 0) {
        usernameElements.forEach(element => {
            element.textContent = adminUsername;
        });
    }
});
