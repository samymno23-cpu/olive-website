// ===== Blog Management =====

let blogData = [];
let filteredBlogData = [];

// Load blog posts
async function loadBlogPosts() {
    try {
        const response = await fetch('data/db.json');
        const data = await response.json();
        blogData = data.blog.filter(post => post.published);
        filteredBlogData = [...blogData];
        displayBlogPosts();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('blogGrid').innerHTML = `
            <div class="error-message">
                <p>حدث خطأ في تحميل المقالات. الرجاء المحاولة لاحقاً.</p>
            </div>
        `;
    }
}

// Display blog posts
function displayBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    const noResults = document.getElementById('noResults');

    if (filteredBlogData.length === 0) {
        blogGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    blogGrid.style.display = 'grid';
    noResults.style.display = 'none';

    blogGrid.innerHTML = filteredBlogData.map(post => `
        <article class="blog-card">
            <div class="blog-card-image">
                <div class="blog-icon">${post.image}</div>
                <span class="blog-category">${post.category}</span>
            </div>
            <div class="blog-card-content">
                <div class="blog-meta">
                    <span class="blog-author">✍️ ${post.author}</span>
                    <span class="blog-date">📅 ${post.date}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">#${tag}</span>`).join('')}
                </div>
                <a href="blog-post.html?id=${post.id}" class="btn btn-read-more">اقرأ المزيد ←</a>
            </div>
        </article>
    `).join('');

    // Animate cards
    animateBlogCards();
}

// Animate blog cards
function animateBlogCards() {
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Search blog posts
function searchBlog() {
    const searchTerm = document.getElementById('blogSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    filteredBlogData = blogData.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) ||
                            post.excerpt.toLowerCase().includes(searchTerm) ||
                            post.tags.some(tag => tag.toLowerCase().includes(searchTerm));

        const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    displayBlogPosts();
}

// Filter blog by category
function filterBlog() {
    searchBlog();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});
