// gallery.js - lightbox minimal et accessible
(() => {
  const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
  if (!thumbs.length) return;

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const btnClose = document.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  // construire tableau d'images/alt
  const images = thumbs.map(t => {
    const img = t.querySelector('img');
    return { src: img ? img.getAttribute('src') : '', alt: img ? img.getAttribute('alt') : '' };
  });

  let current = 0;

  function openAt(index) {
    const item = images[index];
    if (!item) return;
    lbImg.src = item.src;
    lbImg.alt = item.alt || `Image ${index + 1}`;
    lbCaption.textContent = item.alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    current = index;
    btnClose.focus();
  }

  function closeLB() {
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.classList.remove('modal-open');
  }

  function prev() {
    openAt((current - 1 + images.length) % images.length);
  }

  function next() {
    openAt((current + 1) % images.length);
  }

  thumbs.forEach((t, i) => {
    t.addEventListener('click', () => openAt(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAt(i);
      }
    });
  });

  btnClose.addEventListener('click', closeLB);
  if (btnPrev) btnPrev.addEventListener('click', prev);
  if (btnNext) btnNext.addEventListener('click', next);

  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
  });

  // click sur backdrop ferme
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLB();
  });
})();