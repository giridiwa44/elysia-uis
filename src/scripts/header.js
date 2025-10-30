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

const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchItems = document.querySelectorAll('.command-item');
const commandList = document.querySelector('#searchModal .max-h-60'); // perbaikan disini


let currentIndex = -1;

// buka modal
function openPalette() {
  searchModal.classList.remove('hidden', 'opacity-0', 'scale-95');
  searchModal.classList.add('flex', 'opacity-100', 'scale-100');
  setTimeout(() => searchInput.focus(), 150);
}

// tutup modal
function closePalette() {
  searchModal.classList.remove('opacity-100', 'scale-100');
  setTimeout(() => searchModal.classList.add('hidden', 'opacity-0', 'scale-95'), 200);
}

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openPalette();
});

// Tutup pakai ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePalette();

  // Ctrl+K atau Cmd+K
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openPalette();
  }
});

// Buat elemen not found (sekali saja)
const notFoundEl = document.createElement('div');
notFoundEl.textContent = '⚠️ No Component Found';
notFoundEl.className = 'text-center text-gray-500 dark:text-neutral-400 py-4 text-sm hidden';
commandList.appendChild(notFoundEl);

// Filter item
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  let anyVisible = false;
  currentIndex = -1;

  searchItems.forEach((item) => {
    const match = item.textContent.toLowerCase().includes(q);
    item.style.display = match ? '' : 'none';
    if (match) anyVisible = true;
  });

  // Tampilkan atau sembunyikan teks "No Component Found"
  notFoundEl.classList.toggle('hidden', anyVisible);
});

// Navigasi keyboard
searchInput.addEventListener('keydown', (e) => {
  const visibleItems = Array.from(searchItems).filter(item => item.style.display !== 'none');

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % visibleItems.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  } else if (e.key === 'Enter' && currentIndex >= 0) {
    e.preventDefault();
    visibleItems[currentIndex].click(); // klik link atau tombol
  }

  visibleItems.forEach((item, i) => {
    item.classList.toggle('bg-gray-200', i === currentIndex);
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




