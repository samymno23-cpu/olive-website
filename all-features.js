// ===== All Features System =====

let db = null;

// Load database
async function loadDB() {
    try {
        const response = await fetch('data/db.json');
        db = await response.json();
        return db;
    } catch (error) {
        console.error('Error loading database:', error);
        return null;
    }
}

// ===== Calculator Feature =====
function initCalculator() {
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const totalPriceEl = document.getElementById('totalPrice');

    if (!productSelect || !quantityInput) return;

    function calculateTotal() {
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const priceMatch = selectedOption.text.match(/\((\d+)\s*ج\)/);

        if (priceMatch && db) {
            const productPrice = parseInt(priceMatch[1]);
            const quantity = parseInt(quantityInput.value) || 1;
            const shippingCost = db.settings.shippingCost || 50;
            const total = (productPrice * quantity) + shippingCost;

            if (totalPriceEl) {
                totalPriceEl.innerHTML = `
                    <div class="price-calculator">
                        <div class="calc-row">
                            <span>سعر المنتج:</span>
                            <span>${productPrice} ج</span>
                        </div>
                        <div class="calc-row">
                            <span>الكمية:</span>
                            <span>× ${quantity}</span>
                        </div>
                        <div class="calc-row">
                            <span>الشحن:</span>
                            <span>+ ${shippingCost} ج</span>
                        </div>
                        <div class="calc-row total">
                            <span><strong>الإجمالي:</strong></span>
                            <span><strong>${total} ج</strong></span>
                        </div>
                    </div>
                `;
            }
        }
    }

    productSelect.addEventListener('change', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);
    calculateTotal(); // Initial calculation
}

// ===== Product Rating System =====
async function initRatingSystem() {
    if (!db) db = await loadDB();
    if (!db) return;

    const products = db.products || [];

    products.forEach(product => {
        const productElement = document.querySelector(`[data-product-id="${product.id}"]`);
        if (!productElement) return;

        // Add rating stars
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'product-rating';
        ratingContainer.innerHTML = `
            <div class="stars">${'⭐'.repeat(Math.round(product.ratings.average))}</div>
            <div class="rating-info">${product.ratings.average} (${product.ratings.count} تقييم)</div>
        `;

        productElement.appendChild(ratingContainer);
    });
}

// ===== Chatbot Feature =====
function initChatbot() {
    // Create chatbot button
    const chatbotBtn = document.createElement('button');
    chatbotBtn.className = 'fab chatbot-toggle';
    chatbotBtn.setAttribute('aria-label', 'دردشة مباشرة');
    chatbotBtn.innerHTML = '<span>💬</span>';
    chatbotBtn.onclick = toggleChatbot;

    document.querySelector('.floating-actions')?.appendChild(chatbotBtn);

    // Create chatbot window
    const chatbotWindow = document.createElement('div');
    chatbotWindow.id = 'chatbotWindow';
    chatbotWindow.className = 'chatbot-window';
    chatbotWindow.style.display = 'none';
    chatbotWindow.innerHTML = `
        <div class="chatbot-header">
            <div class="chatbot-title">
                <span class="chatbot-icon">🤖</span>
                <span>مساعد الإيمان للزيتون</span>
            </div>
            <button class="chatbot-close" onclick="toggleChatbot()">×</button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages">
            <div class="bot-message">
                مرحباً! أنا مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟
            </div>
            <div class="quick-replies">
                <button onclick="sendQuickReply('أسعار المنتجات')">أسعار المنتجات</button>
                <button onclick="sendQuickReply('مناطق التوصيل')">مناطق التوصيل</button>
                <button onclick="sendQuickReply('طرق الدفع')">طرق الدفع</button>
            </div>
        </div>
        <div class="chatbot-input">
            <input type="text" id="chatbotInput" placeholder="اكتب رسالتك...">
            <button onclick="sendMessage()">إرسال</button>
        </div>
    `;

    document.body.appendChild(chatbotWindow);
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbotWindow');
    if (chatbot) {
        chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();

    if (message) {
        addUserMessage(message);
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addBotMessage(response);
        }, 1000);
    }
}

function sendQuickReply(message) {
    addUserMessage(message);
    setTimeout(() => {
        const response = getBotResponse(message);
        addBotMessage(response);
    }, 1000);
}

function addUserMessage(message) {
    const messagesDiv = document.getElementById('chatbotMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'user-message';
    msgDiv.textContent = message;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addBotMessage(message) {
    const messagesDiv = document.getElementById('chatbotMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'bot-message';
    msgDiv.innerHTML = message;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getBotResponse(message) {
    message = message.toLowerCase();

    if (message.includes('سعر') || message.includes('أسعار')) {
        return `أسعار منتجاتنا:<br>
        - زيت زيتون بلاستيك: 450 ج (لتر) - 225 ج (نصف لتر)<br>
        - زيت زيتون زجاج: 550 ج (لتر) - 275 ج (نصف لتر)<br>
        - مخلل زيتون: 90 ج (كيلو)`;
    }

    if (message.includes('توصيل') || message.includes('شحن')) {
        return 'نوصل لمحافظات البحيرة وكفر الشيخ فقط. رسوم الشحن: 50 جنيه. التوصيل خلال 2-3 أيام عمل.';
    }

    if (message.includes('دفع') || message.includes('طرق')) {
        return 'طرق الدفع المتاحة:<br>- كاش عند الاستلام<br>- تحويل بنكي<br>- فودافون كاش';
    }

    if (message.includes('طلب') || message.includes('اطلب')) {
        return 'يمكنك تقديم طلبك عبر:<br>1. نموذج الطلب في الموقع<br>2. الاتصال على: 01091940551<br>3. واتساب: <a href="https://wa.me/201091940551">اضغط هنا</a>';
    }

    return 'شكراً لرسالتك! للمزيد من المساعدة، يمكنك الاتصال بنا على 01091940551 أو عبر واتساب.';
}

// ===== Interactive Map =====
function initMap() {
    const mapContainer = document.getElementById('deliveryMap');
    if (!mapContainer) return;

    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <div class="map-icon">🗺️</div>
            <h3>مناطق التوصيل</h3>
            <div class="delivery-areas">
                <div class="area-card">
                    <div class="area-icon">📍</div>
                    <h4>البحيرة</h4>
                    <p>جميع المدن والمراكز</p>
                </div>
                <div class="area-card">
                    <div class="area-icon">📍</div>
                    <h4>كفر الشيخ</h4>
                    <p>جميع المدن والمراكز</p>
                </div>
            </div>
            <p class="map-note">رسوم الشحن: 50 جنيه لجميع المناطق</p>
        </div>
    `;
}

// ===== Product Comparison =====
let comparisonList = [];

function addToComparison(productId) {
    if (comparisonList.includes(productId)) {
        removeFromComparison(productId);
        return;
    }

    if (comparisonList.length >= 3) {
        alert('يمكنك مقارنة 3 منتجات كحد أقصى');
        return;
    }

    comparisonList.push(productId);
    updateComparisonButton();
    showMessage('تمت الإضافة للمقارنة');
}

function removeFromComparison(productId) {
    comparisonList = comparisonList.filter(id => id !== productId);
    updateComparisonButton();
}

function updateComparisonButton() {
    let btn = document.getElementById('compareBtn');

    if (!btn && comparisonList.length > 0) {
        btn = document.createElement('button');
        btn.id = 'compareBtn';
        btn.className = 'compare-floating-btn';
        btn.onclick = showComparison;
        document.body.appendChild(btn);
    }

    if (btn) {
        if (comparisonList.length === 0) {
            btn.remove();
        } else {
            btn.innerHTML = `<span>⚖️</span><span>مقارنة (${comparisonList.length})</span>`;
        }
    }
}

async function showComparison() {
    if (!db) db = await loadDB();
    if (!db || comparisonList.length === 0) return;

    const products = db.products.filter(p => comparisonList.includes(p.id));

    const comparisonHTML = `
        <div class="comparison-modal">
            <div class="comparison-header">
                <h2>مقارنة المنتجات</h2>
                <button onclick="closeComparison()">×</button>
            </div>
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>الخاصية</th>
                            ${products.map(p => `<th>${p.title}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>الصورة</td>
                            ${products.map(p => `<td><div class="compare-icon">${p.image}</div></td>`).join('')}
                        </tr>
                        <tr>
                            <td>السعر</td>
                            ${products.map(p => `<td>${p.prices[0].price} ج</td>`).join('')}
                        </tr>
                        <tr>
                            <td>التقييم</td>
                            ${products.map(p => `<td>${'⭐'.repeat(p.ratings.average)} (${p.ratings.count})</td>`).join('')}
                        </tr>
                        <tr>
                            <td>الشحن</td>
                            ${products.map(p => `<td>${p.shipping} ج</td>`).join('')}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = comparisonHTML;
    overlay.onclick = (e) => {
        if (e.target === overlay) closeComparison();
    };

    document.body.appendChild(overlay);
}

function closeComparison() {
    document.querySelector('.modal-overlay')?.remove();
}

// ===== Product Filter =====
function initProductFilter() {
    const filterContainer = document.getElementById('productFilters');
    if (!filterContainer) return;

    filterContainer.innerHTML = `
        <div class="filter-controls">
            <select id="priceFilter" onchange="filterProducts()">
                <option value="all">جميع الأسعار</option>
                <option value="low">أقل من 300 ج</option>
                <option value="medium">300 - 500 ج</option>
                <option value="high">أكثر من 500 ج</option>
            </select>

            <select id="sortFilter" onchange="filterProducts()">
                <option value="default">الترتيب الافتراضي</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
            </select>
        </div>
    `;
}

// ===== Advanced Search =====
function initAdvancedSearch() {
    const searchContainer = document.getElementById('advancedSearch');
    if (!searchContainer) return;

    searchContainer.innerHTML = `
        <div class="advanced-search">
            <input type="text" id="mainSearch" placeholder="ابحث في الموقع..." onkeyup="performSearch()">
            <div id="searchResults" class="search-results"></div>
        </div>
    `;
}

async function performSearch() {
    const query = document.getElementById('mainSearch')?.value.toLowerCase();
    if (!query || query.length < 2) {
        document.getElementById('searchResults').style.display = 'none';
        return;
    }

    if (!db) db = await loadDB();
    if (!db) return;

    const results = [];

    // Search in products
    db.products.forEach(p => {
        if (p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)) {
            results.push({ type: 'منتج', title: p.title, link: `#product-${p.id}` });
        }
    });

    // Search in blog
    db.blog.forEach(b => {
        if (b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query)) {
            results.push({ type: 'مقال', title: b.title, link: `blog-post.html?id=${b.id}` });
        }
    });

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    if (!resultsDiv) return;

    if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
        resultsDiv.style.display = 'block';
        return;
    }

    resultsDiv.innerHTML = results.map(r => `
        <a href="${r.link}" class="search-result-item">
            <span class="result-type">${r.type}</span>
            <span class="result-title">${r.title}</span>
        </a>
    `).join('');
    resultsDiv.style.display = 'block';
}

// ===== Order Tracking =====
function initOrderTracking() {
    const trackingContainer = document.getElementById('orderTracking');
    if (!trackingContainer) return;

    trackingContainer.innerHTML = `
        <div class="tracking-form">
            <h3>تتبع طلبك</h3>
            <input type="text" id="orderNumber" placeholder="رقم الطلب">
            <input type="tel" id="orderPhone" placeholder="رقم الهاتف">
            <button onclick="trackOrder()" class="btn btn-primary">تتبع</button>
        </div>
        <div id="trackingResult" class="tracking-result"></div>
    `;
}

async function trackOrder() {
    const orderNumber = document.getElementById('orderNumber')?.value;
    const orderPhone = document.getElementById('orderPhone')?.value;

    if (!orderNumber || !orderPhone) {
        alert('الرجاء إدخال رقم الطلب ورقم الهاتف');
        return;
    }

    if (!db) db = await loadDB();
    if (!db) return;

    const order = db.orders.find(o => o.id == orderNumber && o.phone === orderPhone);

    const resultDiv = document.getElementById('trackingResult');
    if (!order) {
        resultDiv.innerHTML = '<div class="error">لم يتم العثور على الطلب</div>';
        return;
    }

    const statusSteps = ['pending', 'processing', 'shipped', 'completed'];
    const currentIndex = statusSteps.indexOf(order.status);

    resultDiv.innerHTML = `
        <div class="tracking-info">
            <h4>تفاصيل الطلب #${order.id}</h4>
            <div class="tracking-steps">
                ${statusSteps.map((step, index) => `
                    <div class="tracking-step ${index <= currentIndex ? 'active' : ''}">
                        <div class="step-icon">${index <= currentIndex ? '✓' : '○'}</div>
                        <div class="step-label">${getStatusText(step)}</div>
                    </div>
                `).join('')}
            </div>
            <p><strong>الحالة:</strong> ${getStatusText(order.status)}</p>
            <p><strong>المنتج:</strong> ${order.product}</p>
            <p><strong>التاريخ:</strong> ${order.date}</p>
        </div>
    `;
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'قيد الانتظار',
        'processing': 'قيد المعالجة',
        'shipped': 'تم الشحن',
        'completed': 'مكتمل',
        'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
}

// ===== Coupon System =====
function applyCoupon() {
    const couponInput = document.getElementById('couponCode');
    if (!couponInput) return;

    const code = couponInput.value.trim().toUpperCase();

    if (!db) {
        alert('جاري التحميل...');
        return;
    }

    const coupon = db.coupons.find(c => c.code === code && c.active);

    if (!coupon) {
        showMessage('كود الخصم غير صحيح أو منتهي الصلاحية', 'error');
        return;
    }

    if (coupon.usageCount >= coupon.usageLimit) {
        showMessage('تم استخدام هذا الكود بالكامل', 'error');
        return;
    }

    const discount = coupon.type === 'percentage'
        ? `${coupon.discount}%`
        : `${coupon.discount} ج`;

    showMessage(`تم تطبيق الخصم: ${discount}`, 'success');
}

// ===== Utility Functions =====
function showMessage(message, type = 'success') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `alert alert-${type}`;
    msgDiv.textContent = message;
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '20px';
    msgDiv.style.left = '50%';
    msgDiv.style.transform = 'translateX(-50%)';
    msgDiv.style.zIndex = '10000';
    document.body.appendChild(msgDiv);

    setTimeout(() => msgDiv.remove(), 3000);
}

// ===== Initialize All Features =====
document.addEventListener('DOMContentLoaded', async function() {
    db = await loadDB();

    initCalculator();
    initRatingSystem();
    initChatbot();
    initMap();
    initProductFilter();
    initAdvancedSearch();
    initOrderTracking();
});
