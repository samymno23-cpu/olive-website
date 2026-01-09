🫒 Olive Website | موقع الإيمان للزيتون
�

🌐 **الموقع المباشر**: [https://samymno23-cpu.github.io/olive-website/](https://samymno23-cpu.github.io/olive-website/)

[![Website](https://img.shields.io/badge/الموقع_المباشر-زيارة_الآن-brightgreen?style=for-the-badge)](https://samymno23-cpu.github.io/olive-website/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/samymno23-cpu/olive-website)

---<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>زيتونة | منتجات الزيتون الفاخرة</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --olive-dark: #2D3A1D;
            --olive-green: #4A5D23;
            --olive-light: #7A8450;
            --gold: #C9A227;
            --gold-light: #E8D5A3;
            --cream: #F5F1E6;
            --white: #FEFDFB;
            --text-dark: #1A1A1A;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Tajawal', sans-serif;
            background: var(--cream);
            color: var(--text-dark);
            overflow-x: hidden;
        }

        /* Decorative Olive Pattern */
        .olive-pattern {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cellipse cx='50' cy='50' rx='20' ry='30' fill='%232D3A1D'/%3E%3C/svg%3E");
            background-size: 80px;
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            padding: 1.5rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            transition: all 0.4s ease;
            background: transparent;
        }

        nav.scrolled {
            background: rgba(45, 58, 29, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 5%;
        }

        .logo {
            font-family: 'Amiri', serif;
            font-size: 2rem;
            font-weight: 700;
            color: var(--gold);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo-icon {
            width: 45px;
            height: 45px;
        }

        .nav-links {
            display: flex;
            gap: 3rem;
            list-style: none;
        }

        .nav-links a {
            color: var(--white);
            text-decoration: none;
            font-weight: 500;
            font-size: 1.1rem;
            position: relative;
            transition: color 0.3s;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            right: 0;
            width: 0;
            height: 2px;
            background: var(--gold);
            transition: width 0.3s;
        }

        .nav-links a:hover {
            color: var(--gold);
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--olive-dark) 0%, var(--olive-green) 50%, var(--olive-light) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 80%;
            height: 150%;
            background: radial-gradient(ellipse, rgba(201, 162, 39, 0.15) 0%, transparent 70%);
            animation: glow 8s ease-in-out infinite;
        }

        @keyframes glow {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.15; }
            50% { transform: scale(1.1) rotate(10deg); opacity: 0.25; }
        }

        .hero-content {
            text-align: center;
            z-index: 10;
            padding: 2rem;
            animation: fadeUp 1.2s ease-out;
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hero-badge {
            display: inline-block;
            background: rgba(201, 162, 39, 0.2);
            border: 1px solid var(--gold);
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            color: var(--gold-light);
            font-size: 0.9rem;
            margin-bottom: 2rem;
            animation: fadeUp 1.2s ease-out 0.2s both;
        }

        .hero h1 {
            font-family: 'Amiri', serif;
            font-size: clamp(3rem, 8vw, 6rem);
            color: var(--white);
            margin-bottom: 1.5rem;
            line-height: 1.2;
            animation: fadeUp 1.2s ease-out 0.4s both;
        }

        .hero h1 span {
            color: var(--gold);
            display: block;
        }

        .hero p {
            font-size: 1.3rem;
            color: var(--gold-light);
            max-width: 600px;
            margin: 0 auto 3rem;
            line-height: 1.8;
            animation: fadeUp 1.2s ease-out 0.6s both;
        }

        .hero-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeUp 1.2s ease-out 0.8s both;
        }

        .btn {
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.4s ease;
            cursor: pointer;
            border: none;
        }

        .btn-primary {
            background: var(--gold);
            color: var(--olive-dark);
        }

        .btn-primary:hover {
            background: var(--gold-light);
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(201, 162, 39, 0.4);
        }

        .btn-secondary {
            background: transparent;
            color: var(--white);
            border: 2px solid var(--white);
        }

        .btn-secondary:hover {
            background: var(--white);
            color: var(--olive-dark);
            transform: translateY(-3px);
        }

        /* Floating Olives */
        .floating-olive {
            position: absolute;
            opacity: 0.1;
            animation: float 20s ease-in-out infinite;
        }

        .floating-olive:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .floating-olive:nth-child(2) { top: 60%; left: 5%; animation-delay: 3s; }
        .floating-olive:nth-child(3) { top: 30%; right: 8%; animation-delay: 6s; }
        .floating-olive:nth-child(4) { bottom: 20%; right: 15%; animation-delay: 9s; }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(10deg); }
        }

        /* Section Styles */
        section {
            padding: 6rem 5%;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-header h2 {
            font-family: 'Amiri', serif;
            font-size: clamp(2rem, 5vw, 3.5rem);
            color: var(--olive-dark);
            margin-bottom: 1rem;
            position: relative;
            display: inline-block;
        }

        .section-header h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            right: 50%;
            transform: translateX(50%);
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .section-header p {
            color: var(--olive-light);
            font-size: 1.2rem;
            max-width: 600px;
            margin: 1.5rem auto 0;
        }

        /* Products Section */
        .products {
            background: var(--white);
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .product-card {
            background: var(--cream);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.5s ease;
            position: relative;
        }

        .product-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 30px 60px rgba(45, 58, 29, 0.15);
        }

        .product-image {
            height: 280px;
            background: linear-gradient(135deg, var(--olive-green), var(--olive-light));
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .product-image::before {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
            animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
            0%, 100% { transform: translate(-30%, -30%); }
            50% { transform: translate(30%, 30%); }
        }

        .product-icon {
            font-size: 6rem;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
        }

        .product-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: var(--gold);
            color: var(--olive-dark);
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }

        .product-info {
            padding: 2rem;
        }

        .product-info h3 {
            font-family: 'Amiri', serif;
            font-size: 1.6rem;
            color: var(--olive-dark);
            margin-bottom: 0.8rem;
        }

        .product-info p {
            color: var(--olive-light);
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }

        .product-price {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .price {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--gold);
        }

        .price span {
            font-size: 0.9rem;
            color: var(--olive-light);
            font-weight: 400;
        }

        .add-to-cart {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--olive-dark);
            color: var(--white);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            font-size: 1.3rem;
        }

        .add-to-cart:hover {
            background: var(--gold);
            color: var(--olive-dark);
            transform: scale(1.1);
        }

        /* Features Section */
        .features {
            background: linear-gradient(180deg, var(--cream) 0%, var(--white) 100%);
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .feature-card {
            text-align: center;
            padding: 3rem 2rem;
            background: var(--white);
            border-radius: 20px;
            border: 1px solid rgba(74, 93, 35, 0.1);
            transition: all 0.4s ease;
        }

        .feature-card:hover {
            border-color: var(--gold);
            box-shadow: 0 20px 50px rgba(45, 58, 29, 0.1);
        }

        .feature-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--olive-dark), var(--olive-green));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
        }

        .feature-card h3 {
            font-family: 'Amiri', serif;
            font-size: 1.4rem;
            color: var(--olive-dark);
            margin-bottom: 1rem;
        }

        .feature-card p {
            color: var(--olive-light);
            line-height: 1.7;
        }

        /* About Section */
        .about {
            background: var(--olive-dark);
            position: relative;
            overflow: hidden;
        }

        .about::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='2' fill='%23C9A227' opacity='0.1'/%3E%3C/svg%3E");
            background-size: 30px;
        }

        .about-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            position: relative;
            z-index: 10;
        }

        .about-text h2 {
            font-family: 'Amiri', serif;
            font-size: clamp(2rem, 4vw, 3rem);
            color: var(--gold);
            margin-bottom: 1.5rem;
        }

        .about-text p {
            color: var(--gold-light);
            font-size: 1.1rem;
            line-height: 2;
            margin-bottom: 2rem;
        }

        .about-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .stat {
            text-align: center;
        }

        .stat-number {
            font-family: 'Amiri', serif;
            font-size: 2.5rem;
            color: var(--gold);
            font-weight: 700;
        }

        .stat-label {
            color: var(--gold-light);
            font-size: 0.9rem;
        }

        .about-visual {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .olive-tree {
            width: 300px;
            height: 350px;
            position: relative;
        }

        .tree-circle {
            position: absolute;
            border: 2px solid var(--gold);
            border-radius: 50%;
            opacity: 0.3;
            animation: pulse 4s ease-in-out infinite;
        }

        .tree-circle:nth-child(1) {
            width: 200px;
            height: 200px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .tree-circle:nth-child(2) {
            width: 280px;
            height: 280px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-delay: 1s;
        }

        .tree-circle:nth-child(3) {
            width: 360px;
            height: 360px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-delay: 2s;
        }

        .tree-emoji {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 8rem;
            filter: drop-shadow(0 0 30px rgba(201, 162, 39, 0.5));
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
        }

        /* Contact Section */
        .contact {
            background: var(--white);
        }

        .contact-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .contact-form {
            background: var(--cream);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(45, 58, 29, 0.1);
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--olive-dark);
            font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 1rem 1.5rem;
            border: 2px solid transparent;
            border-radius: 12px;
            background: var(--white);
            font-family: 'Tajawal', sans-serif;
            font-size: 1rem;
            transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--gold);
            box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.1);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 150px;
        }

        .submit-btn {
            width: 100%;
            padding: 1.2rem;
            background: linear-gradient(135deg, var(--olive-dark), var(--olive-green));
            color: var(--white);
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.4s;
            font-family: 'Tajawal', sans-serif;
        }

        .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(45, 58, 29, 0.3);
        }

        /* Footer */
        footer {
            background: var(--olive-dark);
            padding: 4rem 5% 2rem;
            color: var(--gold-light);
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            margin-bottom: 3rem;
        }

        .footer-brand .logo {
            margin-bottom: 1rem;
        }

        .footer-brand p {
            line-height: 1.8;
            opacity: 0.8;
        }

        .footer-links h4 {
            color: var(--gold);
            font-family: 'Amiri', serif;
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
        }

        .footer-links ul {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 0.8rem;
        }

        .footer-links a {
            color: var(--gold-light);
            text-decoration: none;
            transition: color 0.3s;
            opacity: 0.8;
        }

        .footer-links a:hover {
            color: var(--gold);
            opacity: 1;
        }

        .footer-contact p {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 1rem;
            opacity: 0.8;
        }

        .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }

        .social-links a {
            width: 45px;
            height: 45px;
            background: rgba(201, 162, 39, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--gold);
            text-decoration: none;
            transition: all 0.3s;
            font-size: 1.2rem;
        }

        .social-links a:hover {
            background: var(--gold);
            color: var(--olive-dark);
            transform: translateY(-5px);
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(201, 162, 39, 0.2);
            opacity: 0.7;
        }

        /* Mobile Menu */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: var(--white);
            font-size: 1.8rem;
            cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 968px) {
            .about-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .about-visual {
                order: -1;
            }

            .form-row {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .mobile-menu-btn {
                display: block;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .about-stats {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }

        /* Scroll Reveal Animation */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }

        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>
    <div class="olive-pattern"></div>

    <!-- Navigation -->
    <nav id="navbar">
        <a href="#" class="logo">
            <svg class="logo-icon" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="25" cy="28" rx="12" ry="18" fill="#4A5D23"/>
                <ellipse cx="25" cy="28" rx="8" ry="14" fill="#7A8450"/>
                <path d="M25 10 Q30 5 35 8" stroke="#4A5D23" stroke-width="2" fill="none"/>
                <ellipse cx="36" cy="7" rx="4" ry="2" fill="#4A5D23" transform="rotate(30 36 7)"/>
            </svg>
            زيتونة
        </a>
        <ul class="nav-links">
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#products">منتجاتنا</a></li>
            <li><a href="#features">مميزاتنا</a></li>
            <li><a href="#about">من نحن</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
        </ul>
        <button class="mobile-menu-btn">☰</button>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <svg class="floating-olive" width="60" height="80" viewBox="0 0 60 80">
            <ellipse cx="30" cy="45" rx="18" ry="28" fill="#C9A227"/>
        </svg>
        <svg class="floating-olive" width="50" height="70" viewBox="0 0 50 70">
            <ellipse cx="25" cy="40" rx="15" ry="25" fill="#C9A227"/>
        </svg>
        <svg class="floating-olive" width="55" height="75" viewBox="0 0 55 75">
            <ellipse cx="27" cy="42" rx="16" ry="26" fill="#C9A227"/>
        </svg>
        <svg class="floating-olive" width="45" height="65" viewBox="0 0 45 65">
            <ellipse cx="22" cy="38" rx="14" ry="22" fill="#C9A227"/>
        </svg>
        
        <div class="hero-content">
            <span class="hero-badge">🫒 جودة طبيعية 100%</span>
            <h1>
                نقاء الطبيعة
                <span>في كل قطرة</span>
            </h1>
            <p>
                نقدم لكم أجود أنواع زيت الزيتون البكر الممتاز ومخللات الزيتون الفاخرة، 
                من أشجار زيتون معمّرة بعناية فائقة وحب للتراث
            </p>
            <div class="hero-buttons">
                <a href="#products" class="btn btn-primary">اكتشف منتجاتنا</a>
                <a href="#about" class="btn btn-secondary">قصتنا</a>
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section class="products" id="products">
        <div class="section-header reveal">
            <h2>منتجاتنا الفاخرة</h2>
            <p>اختيارات مميزة من أجود أنواع الزيتون وزيت الزيتون الطبيعي</p>
        </div>
        
        <div class="products-grid">
            <div class="product-card reveal">
                <div class="product-image">
                    <span class="product-badge">الأكثر مبيعاً</span>
                    <span class="product-icon">🫒</span>
                </div>
                <div class="product-info">
                    <h3>زيت زيتون بكر ممتاز</h3>
                    <p>زيت زيتون بكر ممتاز من العصرة الأولى، غني بالفوائد الصحية ومذاق أصيل</p>
                    <div class="product-price">
                        <span class="price">85 <span>ر.س / لتر</span></span>
                        <button class="add-to-cart">🛒</button>
                    </div>
                </div>
            </div>

            <div class="product-card reveal">
                <div class="product-image">
                    <span class="product-badge">جديد</span>
                    <span class="product-icon">🥒</span>
                </div>
                <div class="product-info">
                    <h3>مخلل زيتون أخضر</h3>
                    <p>زيتون أخضر مخلل بطريقة تقليدية، طعم منعش ومقرمش مثالي للمقبلات</p>
                    <div class="product-price">
                        <span class="price">35 <span>ر.س / كيلو</span></span>
                        <button class="add-to-cart">🛒</button>
                    </div>
                </div>
            </div>

            <div class="product-card reveal">
                <div class="product-image">
                    <span class="product-icon">🫒</span>
                </div>
                <div class="product-info">
                    <h3>مخلل زيتون أسود</h3>
                    <p>زيتون أسود ناضج مخلل بالزيت والأعشاب، نكهة غنية ومميزة</p>
                    <div class="product-price">
                        <span class="price">40 <span>ر.س / كيلو</span></span>
                        <button class="add-to-cart">🛒</button>
                    </div>
                </div>
            </div>

            <div class="product-card reveal">
                <div class="product-image">
                    <span class="product-badge">عرض خاص</span>
                    <span class="product-icon">🎁</span>
                </div>
                <div class="product-info">
                    <h3>طقم الزيتون الفاخر</h3>
                    <p>مجموعة متكاملة تضم زيت الزيتون ومخللات متنوعة، هدية مثالية</p>
                    <div class="product-price">
                        <span class="price">150 <span>ر.س</span></span>
                        <button class="add-to-cart">🛒</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="section-header reveal">
            <h2>لماذا تختارنا؟</h2>
            <p>نلتزم بأعلى معايير الجودة لنقدم لكم الأفضل</p>
        </div>

        <div class="features-grid">
            <div class="feature-card reveal">
                <div class="feature-icon">🌿</div>
                <h3>100% طبيعي</h3>
                <p>منتجات طبيعية بالكامل بدون أي إضافات كيميائية أو مواد حافظة</p>
            </div>

            <div class="feature-card reveal">
                <div class="feature-icon">🏆</div>
                <h3>جودة ممتازة</h3>
                <p>نختار أفضل أنواع الزيتون من مزارع مختارة بعناية</p>
            </div>

            <div class="feature-card reveal">
                <div class="feature-icon">🚚</div>
                <h3>توصيل سريع</h3>
                <p>نوصل منتجاتنا إلى باب منزلك بسرعة وأمان</p>
            </div>

            <div class="feature-card reveal">
                <div class="feature-icon">💯</div>
                <h3>ضمان الرضا</h3>
                <p>نضمن لك جودة منتجاتنا أو استرداد أموالك</p>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="about-content">
            <div class="about-text reveal">
                <h2>قصتنا مع الزيتون</h2>
                <p>
                    منذ أكثر من ثلاثين عاماً ونحن نعتني بأشجار الزيتون المعمّرة في مزارعنا، 
                    نورثها من جيل لجيل مع الحفاظ على الطرق التقليدية في العصر والتخليل.
                    نؤمن بأن الجودة الحقيقية تأتي من الصبر والعناية والحب لما نقدمه.
                </p>
                <p>
                    كل قطرة زيت وكل حبة زيتون تحمل معها قصة عراقة وأصالة، 
                    نقدمها لكم بكل فخر لتكون جزءاً من موائدكم وذكرياتكم الجميلة.
                </p>
                <div class="about-stats">
                    <div class="stat">
                        <div class="stat-number">30+</div>
                        <div class="stat-label">سنة خبرة</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">50K+</div>
                        <div class="stat-label">عميل سعيد</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">100%</div>
                        <div class="stat-label">منتج طبيعي</div>
                    </div>
                </div>
            </div>
            <div class="about-visual reveal">
                <div class="olive-tree">
                    <div class="tree-circle"></div>
                    <div class="tree-circle"></div>
                    <div class="tree-circle"></div>
                    <span class="tree-emoji">🌳</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <div class="section-header reveal">
            <h2>تواصل معنا</h2>
            <p>نسعد بتلقي استفساراتكم وطلباتكم</p>
        </div>

        <div class="contact-container reveal">
            <form class="contact-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>الاسم الكامل</label>
                        <input type="text" placeholder="أدخل اسمك" required>
                    </div>
                    <div class="form-group">
                        <label>رقم الجوال</label>
                        <input type="tel" placeholder="05xxxxxxxx" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>البريد الإلكتروني</label>
                    <input type="email" placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label>رسالتك</label>
                    <textarea placeholder="اكتب رسالتك هنا..."></textarea>
                </div>
                <button type="submit" class="submit-btn">إرسال الرسالة</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-brand">
                <a href="#" class="logo">
                    <svg class="logo-icon" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="25" cy="28" rx="12" ry="18" fill="#4A5D23"/>
                        <ellipse cx="25" cy="28" rx="8" ry="14" fill="#7A8450"/>
                        <path d="M25 10 Q30 5 35 8" stroke="#4A5D23" stroke-width="2" fill="none"/>
                        <ellipse cx="36" cy="7" rx="4" ry="2" fill="#4A5D23" transform="rotate(30 36 7)"/>
                    </svg>
                    زيتونة
                </a>
                <p>نقدم لكم أجود منتجات الزيتون الطبيعية بحب وعناية منذ عام 1994</p>
            </div>

            <div class="footer-links">
                <h4>روابط سريعة</h4>
                <ul>
                    <li><a href="#home">الرئيسية</a></li>
                    <li><a href="#products">منتجاتنا</a></li>
                    <li><a href="#features">مميزاتنا</a></li>
                    <li><a href="#about">من نحن</a></li>
                    <li><a href="#contact">تواصل معنا</a></li>
                </ul>
            </div>

            <div class="footer-links footer-contact">
                <h4>تواصل معنا</h4>
                <p>📍 المملكة العربية السعودية</p>
                <p>📞 +966 50 123 4567</p>
                <p>✉️ info@zaytouna.com</p>
                <div class="social-links">
                    <a href="#">📘</a>
                    <a href="#">📸</a>
                    <a href="#">🐦</a>
                    <a href="#">📱</a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2024 زيتونة. جميع الحقوق محفوظة</p>
        </div>
    </footer>

    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll reveal animation
        const reveals = document.querySelectorAll('.reveal');
        
        function revealOnScroll() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const revealPoint = 150;

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت.');
            this.reset();
        });

        // Add to cart animation
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                this.innerHTML = '✓';
                this.style.background = '#4A5D23';
                this.style.color = '#fff';
                setTimeout(() => {
                    this.innerHTML = '🛒';
                    this.style.background = '';
                    this.style.color = '';
                }, 1500);
            });
        });
    </script>
</body>
</html>
   ├── pages/          # صفحات الموقع
│   ├── assets/         # الصور والملفات
│   └── styles/         # أنماط CSS
├── public/             # ملفات عامة
├── package.json        # معلومات المشروع
└── README.md          # هذا الملف
💻 كيفية الاستخدام
للمستخدمين العاديين:
ادخل الموقع من خلال المتصفح
استكشف قسم المعلومات عن الزيتون
اقرأ المقالات والدراسات
شارك المحتوى على وسائل التواصل
للمطورين:
اتبع خطوات التثبيت أعلاه
عدل الملفات في مجلد src/
اختبر التغييرات محليًا
أرسل Pull Request
🤝 كيفية المساهمة
نرحب بمساهمتك! اتبع هذه الخطوات:
Fork المشروع (انقر على Fork في الأعلى)
أنشئ فرعًا للميزة الجديدة:
git checkout -b feature/أسم-الميزة
اجعل التغييرات وأرسل Commit:
git add .
git commit -m "إضافة ميزة جديدة"
ارفع التغييرات:
git push origin feature/أسم-الميزة
افتح Pull Request وصف التغييرات
🐛 الإبلاغ عن المشاكل
إذا واجهت مشكلة، يرجى:
1. اذهب إلى [قسم Issues](https://github.com/samymno23-cpu/olive-website/issues)
2. انقر New Issue
3. اشرح المشكلة بالتفصيل
4. أرسل المشكلة
📝 الترخيص
هذا المشروع مرخص تحت MIT License - انظر ملف LICENSE للمزيد من التفاصيل.
📞 التواصل والدعم
- **GitHub Issues**: [استخدم Issues](https://github.com/samymno23-cpu/olive-website/issues) للمشاكل التقنية
- **GitHub Discussions**: [شارك اقتراحاتك معنا](https://github.com/samymno23-cpu/olive-website/discussions)
👨‍💻 المطور
**Samymno23**
- **GitHub**: [@samymno23-cpu](https://github.com/samymno23-cpu)
- **الاهتمامات**: تطوير الويب، التصميم، المحتوى العربي
🙏 شكر وتقدير
شكراً لكل من:
ساهم في المشروع
أضاف نجمة ⭐
نشر المشروع
📊 حالة المشروع
الميزة
الحالة
الواجهة الأمامية
✅ مكتملة
الواجهة الخلفية
🔄 قيد الإنجاز
قاعدة البيانات
🔄 قيد الإنجاز
الاختبارات
⏳ قريباً
�

English Summary
Olive Website is an interactive web platform dedicated to spreading information about the benefits of olives from religious and health perspectives. The project combines faith and science to provide valuable and reliable content.
Quick Start
git clone https://github.com/samymno23-cpu/olive-website.git
npm install
npm start
Features
Modern and user-friendly interface
Responsive design for all devices
Comprehensive olive benefits library
Powerful search engine
Full Arabic language support
Secure content storage
License
MIT License
�

⭐ إذا أعجبك المشروع، لا تنسَ إضافة نجمة!
�