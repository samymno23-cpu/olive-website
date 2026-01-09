// ===== Initialize EmailJS =====
// IMPORTANT: Replace these with your EmailJS credentials
// Get them from: https://www.emailjs.com/
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

// ===== Star Rating System =====
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('ratingValue');
const ratingText = document.getElementById('ratingText');
let currentRating = 0;

const ratingMessages = {
    1: 'ضعيف 😞',
    2: 'مقبول 😐',
    3: 'جيد 🙂',
    4: 'ممتاز 😊',
    5: 'رائع جداً! 🤩'
};

// Add click event to each star
stars.forEach(star => {
    star.addEventListener('click', function() {
        currentRating = parseInt(this.getAttribute('data-rating'));
        ratingValue.value = currentRating;
        updateStars(currentRating);
        updateRatingText(currentRating);
    });

    // Add hover effect
    star.addEventListener('mouseenter', function() {
        const hoverRating = parseInt(this.getAttribute('data-rating'));
        updateStars(hoverRating);
    });
});

// Reset stars on mouse leave
document.getElementById('starRating').addEventListener('mouseleave', function() {
    updateStars(currentRating);
});

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateRatingText(rating) {
    if (rating > 0) {
        ratingText.textContent = ratingMessages[rating];
        ratingText.style.opacity = '1';
    } else {
        ratingText.textContent = '';
        ratingText.style.opacity = '0';
    }
}

// ===== Form Validation =====
const reviewForm = document.getElementById('reviewForm');
const formInputs = reviewForm.querySelectorAll('input, textarea');

// Real-time validation
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Remove previous error state
    field.classList.remove('error');
    if (errorMessage) {
        errorMessage.classList.remove('show');
    }

    // Check if required field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'هذا الحقل مطلوب';
    }

    // Specific validations
    if (field.id === 'customerName' && field.value) {
        if (field.value.trim().length < 3) {
            isValid = false;
            message = 'الاسم يجب أن يكون 3 أحرف على الأقل';
        }
    }

    if (field.id === 'customerEmail' && field.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            isValid = false;
            message = 'البريد الإلكتروني غير صحيح';
        }
    }

    if (field.id === 'customerPhone' && field.value) {
        const phonePattern = /^01[0-9]{9}$/;
        if (!phonePattern.test(field.value)) {
            isValid = false;
            message = 'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم';
        }
    }

    if (field.id === 'reviewText' && field.value) {
        if (field.value.trim().length < 10) {
            isValid = false;
            message = 'التعليق يجب أن يكون 10 أحرف على الأقل';
        }
    }

    if (!isValid && errorMessage) {
        field.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    return isValid;
}

function validateForm() {
    let isValid = true;

    formInputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (!validateField(input)) {
                isValid = false;
            }
        }
    });

    // Check if rating is selected
    if (!ratingValue.value) {
        isValid = false;
        const ratingFormGroup = ratingValue.closest('.form-group');
        const errorMessage = ratingFormGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = 'يرجى اختيار التقييم';
            errorMessage.classList.add('show');
        }
    }

    return isValid;
}

// ===== Form Submission =====
reviewForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
        // Scroll to first error
        const firstError = reviewForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }

    // Get form data
    const formData = {
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        customerPhone: document.getElementById('customerPhone').value,
        rating: ratingValue.value,
        ratingText: ratingMessages[ratingValue.value],
        reviewText: document.getElementById('reviewText').value,
        date: new Date().toLocaleDateString('ar-EG')
    };

    // Disable submit button
    const submitBtn = reviewForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>⏳</span><span>جاري الإرسال...</span>';
    submitBtn.disabled = true;

    try {
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS credentials
        const response = await emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
            {
                to_email: 'samymno23@gmail.com', // Your email address
                customer_name: formData.customerName,
                customer_email: formData.customerEmail,
                customer_phone: formData.customerPhone,
                rating: formData.rating,
                rating_text: formData.ratingText,
                review_text: formData.reviewText,
                stars: '⭐'.repeat(parseInt(formData.rating)),
                date: formData.date
            }
        );

        console.log('Email sent successfully:', response);

        // Show success message
        showSuccessMessage();

        // Reset form after a delay
        setTimeout(() => {
            reviewForm.reset();
            currentRating = 0;
            updateStars(0);
            updateRatingText(0);
            ratingText.textContent = '';
        }, 2000);

    } catch (error) {
        console.error('Failed to send email:', error);

        // Show error message
        alert('عذراً، حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.');

        // Re-enable submit button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

function showSuccessMessage() {
    const submitBtn = reviewForm.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    const originalText = submitBtn.innerHTML;

    // Update button
    submitBtn.innerHTML = '<span>✓</span><span>تم الإرسال بنجاح!</span>';
    submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

    // Show success message
    successMessage.classList.add('show');

    // Reset after delay
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        successMessage.classList.remove('show');
    }, 3000);
}

// ===== Auto-format phone number =====
const phoneInput = document.getElementById('customerPhone');

phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');

    // Limit to 11 digits
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    e.target.value = value;
});

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Console greeting =====
console.log('%c🫒 الإيمان للزيتون - صفحة التقييمات', 'font-size: 20px; font-weight: bold; color: #2d5016;');
console.log('%cشكراً لمشاركتنا رأيك!', 'font-size: 16px; color: #8b7355;');
