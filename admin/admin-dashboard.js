// ===== Dashboard Data Management =====

let dbData = null;

// Load database
async function loadDatabase() {
    try {
        const response = await fetch('../data/db.json');
        dbData = await response.json();
        updateDashboardStats();
        loadRecentOrders();
    } catch (error) {
        console.error('Error loading database:', error);
        showError('حدث خطأ في تحميل البيانات');
    }
}

// Update dashboard statistics
function updateDashboardStats() {
    if (!dbData) return;

    // Total orders
    const totalOrders = dbData.orders ? dbData.orders.length : 0;
    document.getElementById('totalOrders').textContent = totalOrders;

    // Total revenue
    const totalRevenue = dbData.orders
        ? dbData.orders.reduce((sum, order) => sum + (order.total || 0), 0)
        : 0;
    document.getElementById('totalRevenue').textContent = totalRevenue + ' ج';

    // Total products
    const totalProducts = dbData.products ? dbData.products.length : 0;
    document.getElementById('totalProducts').textContent = totalProducts;

    // Total blog posts
    const totalBlogPosts = dbData.blog ? dbData.blog.filter(post => post.published).length : 0;
    document.getElementById('totalBlogPosts').textContent = totalBlogPosts;

    // Total recipes
    const totalRecipes = dbData.recipes ? dbData.recipes.length : 0;
    document.getElementById('totalRecipes').textContent = totalRecipes;

    // Total reviews
    const totalReviews = dbData.reviews ? dbData.reviews.filter(review => review.approved).length : 0;
    document.getElementById('totalReviews').textContent = totalReviews;

    // Active offers
    const activeOffers = dbData.offers ? dbData.offers.filter(offer => offer.active).length : 0;
    document.getElementById('activeOffers').textContent = activeOffers;
}

// Load recent orders
function loadRecentOrders() {
    if (!dbData || !dbData.orders) {
        document.querySelector('#recentOrdersTable tbody').innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #718096;">
                    لا توجد طلبات حالياً
                </td>
            </tr>
        `;
        return;
    }

    const orders = dbData.orders.slice(0, 5); // Get last 5 orders
    const tbody = document.querySelector('#recentOrdersTable tbody');

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.total} ج</td>
            <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
            <td>${order.date}</td>
            <td>
                <div class="admin-table-actions">
                    <button class="btn-icon btn-view" onclick="viewOrder(${order.id})" title="عرض">👁️</button>
                    <button class="btn-icon btn-edit" onclick="editOrder(${order.id})" title="تعديل">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteOrder(${order.id})" title="حذف">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Get status text in Arabic
function getStatusText(status) {
    const statusMap = {
        'pending': 'قيد الانتظار',
        'completed': 'مكتمل',
        'cancelled': 'ملغي',
        'processing': 'قيد المعالجة',
        'shipped': 'تم الشحن'
    };
    return statusMap[status] || status;
}

// View order
function viewOrder(orderId) {
    const order = dbData.orders.find(o => o.id === orderId);
    if (!order) return;

    showModal('تفاصيل الطلب', `
        <div style="line-height: 2;">
            <p><strong>رقم الطلب:</strong> ${order.id}</p>
            <p><strong>اسم العميل:</strong> ${order.customerName}</p>
            <p><strong>رقم الهاتف:</strong> ${order.phone}</p>
            <p><strong>المحافظة:</strong> ${order.governorate}</p>
            <p><strong>العنوان:</strong> ${order.address}</p>
            <p><strong>المنتج:</strong> ${order.product}</p>
            <p><strong>الكمية:</strong> ${order.quantity}</p>
            <p><strong>السعر:</strong> ${order.price} ج</p>
            <p><strong>الشحن:</strong> ${order.shipping} ج</p>
            <p><strong>الإجمالي:</strong> ${order.total} ج</p>
            <p><strong>الحالة:</strong> ${getStatusText(order.status)}</p>
            <p><strong>التاريخ:</strong> ${order.date}</p>
            ${order.notes ? `<p><strong>ملاحظات:</strong> ${order.notes}</p>` : ''}
        </div>
    `);
}

// Edit order
function editOrder(orderId) {
    alert('ميزة التعديل ستكون متاحة قريباً');
    // TODO: Implement edit functionality
}

// Delete order
function deleteOrder(orderId) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
        dbData.orders = dbData.orders.filter(o => o.id !== orderId);
        saveDatabase();
        loadRecentOrders();
        updateDashboardStats();
        showSuccess('تم حذف الطلب بنجاح');
    }
}

// Save database (mock function - in real app would use backend API)
function saveDatabase() {
    // In a real application, this would send data to backend
    // For now, we'll just update localStorage
    localStorage.setItem('dbData', JSON.stringify(dbData));
    console.log('Database saved to localStorage');
}

// Show modal
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Show success message
function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.left = '50%';
    alert.style.transform = 'translateX(-50%)';
    alert.style.zIndex = '10000';
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Show error message
function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.left = '50%';
    alert.style.transform = 'translateX(-50%)';
    alert.style.zIndex = '10000';
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadDatabase();

    // Refresh data every 30 seconds
    setInterval(loadDatabase, 30000);
});
