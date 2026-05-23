/* ============================================================
   Χάρης & Μαρίτα — interactions
   ============================================================ */

// --- 1) Card flip ---
const flipper = document.getElementById('cardFlipper');
flipper.addEventListener('click', () => {
  flipper.classList.toggle('flipped');
});
flipper.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    flipper.classList.toggle('flipped');
  }
});

// --- 2) Map click → open directions in Google Maps ---
const mapClickArea = document.getElementById('mapClick');
const mapCta = document.getElementById('mapCta');
const mapsUrl = mapCta.getAttribute('href');

mapClickArea.addEventListener('click', () => {
  window.open(mapsUrl, '_blank', 'noopener');
});
mapClickArea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    window.open(mapsUrl, '_blank', 'noopener');
  }
});

// --- 3) Reveal-on-scroll ---
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach((el) => io.observe(el));

// --- 4) Couple photo: hide placeholder if image exists, show if missing ---
const couplePhoto = document.getElementById('couplePhoto');
const couplePlaceholder = document.getElementById('couplePlaceholder');

function checkCouplePhoto() {
  // If the image fails to load OR has no src, show placeholder
  if (!couplePhoto.getAttribute('src') ||
      couplePhoto.complete && couplePhoto.naturalWidth === 0) {
    couplePhoto.style.display = 'none';
    couplePlaceholder.style.display = 'flex';
  } else {
    couplePhoto.style.display = 'block';
    couplePlaceholder.style.display = 'none';
  }
}

couplePhoto.addEventListener('load', () => {
  if (couplePhoto.naturalWidth > 0) {
    couplePhoto.style.display = 'block';
    couplePlaceholder.style.display = 'none';
  }
});
couplePhoto.addEventListener('error', () => {
  couplePhoto.style.display = 'none';
  couplePlaceholder.style.display = 'flex';
});

// Initial check (in case image is cached or already loaded)
if (couplePhoto.complete) checkCouplePhoto();

// --- Handwriting animation for signature line ---
const signatureLine = document.getElementById('signatureLine');
if (signatureLine) {
  const letters = signatureLine.querySelectorAll('span');

  // Stagger the letter reveals
  letters.forEach((letter, i) => {
    letter.style.transitionDelay = `${i * 0.12}s`;
  });

  const signatureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        signatureLine.classList.add('writing');
        signatureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  signatureObserver.observe(signatureLine);
}
