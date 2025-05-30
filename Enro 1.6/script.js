document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                navLinks.classList.remove('active');
            }
        });
    });

    // Hero slideshow
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    leftArrow.addEventListener('click', () => {
        let nextSlide = currentSlide - 1;
        if (nextSlide < 0) nextSlide = slides.length - 1;
        showSlide(nextSlide);
    });

    rightArrow.addEventListener('click', () => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);

    
    // Project details modal
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Language toggle
    const langOptions = document.querySelectorAll('.lang-option');
    let currentLang = localStorage.getItem('language') || 'tr';

    function setLanguage(lang) {
        // Tüm sayfalardaki dil öğelerini güncelle
        document.querySelectorAll('[data-en], [data-tr]').forEach(elem => {
            if (elem.getAttribute(`data-${lang}`)) {
                elem.textContent = elem.getAttribute(`data-${lang}`);
            }
        });

        // HTML lang özelliğini güncelle
        document.querySelector('html').setAttribute('lang', lang);
        localStorage.setItem('language', lang);

        // Aktif dil seçeneğini güncelle
        langOptions.forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-lang') === lang);
        });

        // Sayfa başlığını güncelle
        const titleElement = document.querySelector('title');
        if (titleElement) {
            document.title = titleElement.textContent;
        }

        // URL'deki dil parametresini güncelle
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
    }

    // Sayfa yüklendiğinde URL'den dil parametresini kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && (langParam === 'tr' || langParam === 'en')) {
        currentLang = langParam;
    }

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Sayfa yüklendiğinde mevcut dili uygula
    setLanguage(currentLang);
});