// Pastikan ini dijalankan setelah Alpine dimuat
window.Alpine = window.Alpine || {}

// Tunggu Alpine siap dulu
document.addEventListener('alpine:init', () => {
  if (!Alpine.store('related')) {
    Alpine.store('related', { items: [] });
  }
});

