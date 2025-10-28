const darkToggle = document.querySelector('[data-toggle-dark]');
darkToggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load State
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
}

// ============================
// 🌸 COMMAND PALETTE NEO-BRUTALISM
// ============================

const searchBtn = document.querySelector('[data-open-search]');
const searchModal = document.querySelector('#searchModal'); // gunakan id yg sama dgn markup modal-mu
const searchClose = document.querySelector('[data-close-search]');
const searchInput = document.querySelector('#commandInput'); // input text dalam modal
const searchItems = document.querySelectorAll('.command-item'); // setiap item command

// Fungsi buka modal
function openPalette() {
  searchModal.classList.remove('hidden', 'opacity-0', 'scale-95');
  searchModal.classList.add('flex', 'opacity-100', 'scale-100');
  setTimeout(() => searchInput?.focus(), 150);
}

// Fungsi tutup modal
function closePalette() {
  searchModal.classList.remove('opacity-100', 'scale-100');
  setTimeout(() => searchModal.classList.add('hidden', 'opacity-0', 'scale-95'), 200);
}

// Tombol buka
searchBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  openPalette();
});

// Tombol close
searchClose?.addEventListener('click', () => {
  closePalette();
});

// Tutup dengan ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePalette();

  // Shortcut Ctrl+K / Cmd+K
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openPalette();
  }
});

// Filter command berdasarkan input
searchInput?.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  searchItems.forEach((item) => {
    item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});

// Aksi tiap item command
searchItems.forEach((item) => {
  item.addEventListener('click', () => {
    const text = item.textContent.toLowerCase();

    // Contoh aksi:
    if (text.includes('home')) window.location.href = '/';
    if (text.includes('dark')) document.documentElement.classList.toggle('dark');
    if (text.includes('components')) window.location.href = '/components';

    closePalette();
  });
});

// Menu BTN
const menuBtn = document.querySelector('[data-toggle-menu]');
const mobileMenu = document.querySelector('#mobileMenu');
const menuOverlay = document.querySelector('#menuOverlay');

menuBtn?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('translate-x-0');

  if (isOpen) {
    // Tutup menu
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    menuOverlay.classList.add('hidden');
  } else {
    // Buka menu
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    menuOverlay.classList.remove('hidden');
  }
});

// Tutup saat overlay diklik
menuOverlay?.addEventListener('click', () => {
  mobileMenu.classList.remove('translate-x-0');
  mobileMenu.classList.add('translate-x-full');
  menuOverlay.classList.add('hidden');
});




