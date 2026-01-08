// ===== Scroll to Top Button =====
const scrollToTopBtn = document.querySelector('.scroll-to-top');

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

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Form Validation and Submission =====
const orderForm = document.getElementById('orderForm');
const formInputs = orderForm.querySelectorAll('input, select, textarea');

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

// Validate individual field
function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Remove previous error state
    field.classList.remove('error');
    errorMessage.classList.remove('show');

    // Check if required field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'هذا الحقل مطلوب';
    }

    // Specific validations
    if (field.id === 'phone' && field.value) {
        const phonePattern = /^01[0-9]{9}$/;
        if (!phonePattern.test(field.value)) {
            isValid = false;
            message = 'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم';
        }
    }

    if (field.id === 'fullName' && field.value) {
        if (field.value.trim().length < 3) {
            isValid = false;
            message = 'الاسم يجب أن يكون 3 أحرف على الأقل';
        }
    }

    if (field.id === 'address' && field.value) {
        if (field.value.trim().length < 10) {
            isValid = false;
            message = 'يرجى إدخال العنوان بالتفصيل';
        }
    }

    if (field.id === 'quantity' && field.value) {
        if (field.value < 1) {
            isValid = false;
            message = 'الكمية يجب أن تكون 1 على الأقل';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    return isValid;
}

// Validate entire form
function validateForm() {
    let isValid = true;
    formInputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (!validateField(input)) {
                isValid = false;
            }
        }
    });
    return isValid;
}

// Form submission
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
        // Scroll to first error
        const firstError = orderForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        governorate: document.getElementById('governorate').value,
        payment: document.getElementById('payment').value,
        product: document.getElementById('product').value,
        quantity: document.getElementById('quantity').value,
        notes: document.getElementById('notes').value
    };

    // Create WhatsApp message
    const message = createWhatsAppMessage(formData);

    // Send to WhatsApp
    const whatsappNumber = '201091940551';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    showSuccessMessage();

    // Reset form after a delay
    setTimeout(() => {
        orderForm.reset();
    }, 1000);
});

// Create WhatsApp message from form data
function createWhatsAppMessage(data) {
    let message = '🫒 *طلب جديد من الإيمان للزيتون* 🫒\n\n';
    message += '━━━━━━━━━━━━━━━━━━━\n\n';
    message += `*الاسم:* ${data.fullName}\n`;
    message += `*رقم الهاتف:* ${data.phone}\n`;
    message += `*المحافظة:* ${data.governorate}\n`;
    message += `*العنوان:* ${data.address}\n\n`;
    message += '━━━━━━━━━━━━━━━━━━━\n\n';
    message += `*المنتج:* ${data.product}\n`;
    message += `*الكمية:* ${data.quantity}\n`;
    message += `*طريقة الدفع:* ${data.payment}\n\n`;

    if (data.notes) {
        message += '━━━━━━━━━━━━━━━━━━━\n\n';
        message += `*ملاحظات:* ${data.notes}\n\n`;
    }

    message += '━━━━━━━━━━━━━━━━━━━\n\n';
    message += '✅ *رسوم الشحن: 50 جنيه*\n\n';
    message += 'شكراً لثقتكم في الإيمان للزيتون 🫒';

    return message;
}

// Show success message
function showSuccessMessage() {
    const submitBtn = orderForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>✓</span><span>تم إرسال الطلب بنجاح!</span>';
    submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 3000);
}

// ===== Animate on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .product-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Prevent form double submission =====
let isSubmitting = false;

orderForm.addEventListener('submit', function(e) {
    if (isSubmitting) {
        e.preventDefault();
        return false;
    }
});

// ===== Auto-format phone number =====
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');

    // Limit to 11 digits
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    e.target.value = value;
});

// ===== Product price calculator (optional feature) =====
const productSelect = document.getElementById('product');
const quantityInput = document.getElementById('quantity');

function updateTotalPrice() {
    const selectedProduct = productSelect.value;
    const quantity = parseInt(quantityInput.value) || 1;

    // Extract price from product string
    const priceMatch = selectedProduct.match(/\((\d+)\s*ج\)/);

    if (priceMatch) {
        const productPrice = parseInt(priceMatch[1]);
        const shippingCost = 50;
        const totalPrice = (productPrice * quantity) + shippingCost;

        // You can display this total if you add a total price element in HTML
        console.log(`إجمالي السعر: ${totalPrice} جنيه`);
    }
}

productSelect.addEventListener('change', updateTotalPrice);
quantityInput.addEventListener('input', updateTotalPrice);

// ===== Add loading animation to buttons =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('btn-submit')) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// ===== Console greeting =====
console.log('%c🫒 الإيمان للزيتون', 'font-size: 24px; font-weight: bold; color: #2d5016;');
console.log('%cجودة مصرية أصيلة 100%', 'font-size: 16px; color: #8b7355;');
console.log('%cللطلب والاستفسار: 01091940551', 'font-size: 14px; color: #666;');

// ===== Prevent context menu on images (optional) =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('الموقع جاهز للعمل ✓');

    // Add smooth reveal animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
});
