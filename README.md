# olive-website

مستودع لمشروع موقع olive-website — نسخة ثابتة (Static site) جاهزة للنشر على GitHub Pages.

ماذا يحتوي هذا الريبو:
- مجلد `docs/` يحتوي على صفحة البداية `index.html` كنقطة انطلاق. ضع ملفات موقعك الثابت (HTML/CSS/JS) داخل `docs/` ليتمكن GitHub Pages من نشرها تلقائياً.

كيفية النشر عبر GitHub Pages:
1. ادفع (push) تغييراتك إلى الفرع `main` في هذا المستودع.
2. افتح Settings → Pages في واجهة GitHub.
3. تحت Source اختر Branch: `main` والمجلد: `/docs` ثم اضغط Save.
4. انتظر دقيقة أو اثنتين ثم سيكون موقعك متاحاً على: `https://samymno23-cpu.github.io/olive-website`.

تشغيل محلياً:
- الموقع ثابت، يمكنك فتح `docs/index.html` في المتصفح أو تشغيل سيرفر محلي بسيط مثل:
  ```bash
  # Python 3
  cd docs
  python -m http.server 8000
  ```

إن احتجت أن أرفع ملفاتك الخاصة أو أهيئ Action تلقائياً لبناء مشروع يحتاج خطوة build، أرسل لي أرشيف ZIP بالمشروع أو أخبرني بنوع الإطار (مثلاً React/Next) وسأجهز ذلك.

Licensing: MIT (انظر ملف LICENSE)
