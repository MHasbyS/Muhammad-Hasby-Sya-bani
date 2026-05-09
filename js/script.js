// ========== NAVBAR INTERAKSI ==========

// 1. Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 2. Tutup menu mobile saat klik link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 3. Navbar berubah saat scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 4. Active link saat scrolling (highlight menu sesuai section yang dilihat)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100; // offset untuk fixed navbar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // hapus tanda #
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// 5. Smooth scroll untuk semua anchor link
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

// ========== TYPING EFFECT ==========
const typingTextElement = document.querySelector('.typing-text');
const words = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Content Creator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Menghapus karakter
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Menambahkan karakter
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Jika sudah selesai mengetik satu kata
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Jeda sebelum menghapus
        return;
    }
    
    // Jika sudah selesai menghapus
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata berikutnya
    }
    
    const speed = isDeleting ? 100 : 150;
    setTimeout(typeEffect, speed);
}

// Mulai efek typing jika elemen ada
if (typingTextElement) {
    typeEffect();
}


// ========== CONTACT FORM HANDLER ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Mohon isi nama, email, dan pesan!');
            return;
        }

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Terima kasih! Pesan Anda telah terkirim. Saya akan membalas secepatnya.');
                contactForm.reset();
            } else {
                alert('Gagal mengirim pesan. Silakan coba lagi.');
                console.error('Web3Forms error:', result);
            }
        } catch (error) {
            alert('Terjadi kesalahan koneksi. Silakan coba lagi.');
            console.error('Fetch error:', error);
        }
    });
}