// ============================================
//  NIK AIMAN HAZRIQ'S BLOG — MAIN JAVASCRIPT
// ============================================

const darkToggle = document.getElementById('darkToggle');
const body = document.body;

// ——— SET LIGHT MODE AS THE DEFAULT STATE ———
// Check what theme was saved previously
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  // If they specifically chose dark mode before, keep it dark
  body.classList.add('dark');
  if (darkToggle) darkToggle.textContent = '☀️';
} else if (savedTheme === 'light') {
  // If they chose light mode before, keep it light
  body.classList.remove('dark');
  if (darkToggle) darkToggle.textContent = '🌙';
} else {
  // FIRST TIME VISITORS: Force light mode by default
  body.classList.remove('dark'); 
  if (darkToggle) darkToggle.textContent = '🌙';
  localStorage.setItem('theme', 'light');
}

// ——— DARK MODE TOGGLE CLICK HANDLER ———
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    
    // Update the button icon dynamically
    darkToggle.textContent = isDark ? '☀️' : '🌙';
    
    // Save the user's manual preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ——— MOBILE HAMBURGER MENU ———
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ——— CONTACT FORM HANDLER ———
function handleSend() {
  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');
  const note    = document.getElementById('formNote');

  if (!name || !email || !message || !note) return;

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    note.textContent = '⚠️ Please fill in all fields before sending.';
    note.style.color = '#c8410a';
    return;
  }

  if (!email.value.includes('@')) {
    note.textContent = '⚠️ Please enter a valid email address.';
    note.style.color = '#c8410a';
    return;
  }

  note.textContent = '✅ Message sent! Thanks, ' + name.value.trim() + '. I\'ll get back to you soon.';
  note.style.color = '#2a7a2a';
  name.value = '';
  email.value = '';
  message.value = '';
}

// ——— SCROLL-BASED FADE-IN ———
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.blog-post').forEach(post => {
  post.style.opacity = '0';
  post.style.transform = 'translateY(24px)';
  post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(post);
});
