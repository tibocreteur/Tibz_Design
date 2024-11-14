const caseprofil = document.querySelector('.caseprofil');

caseprofil.addEventListener('mousemove', (e) => {
  const rect = caseprofil.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  caseprofil.style.transform = `rotateX(${y / 20}deg) rotateY(${x / 20}deg)`;
});

caseprofil.addEventListener('mouseleave', () => {
  caseprofil.style.transform = 'rotateX(0) rotateY(0)';
});

