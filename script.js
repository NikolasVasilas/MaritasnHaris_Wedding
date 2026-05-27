/* ============================================================
   Χάρης & Μαρίτα — interactions
   ============================================================ */

// --- 1) Card flip + envelope reveal animation ---
const flipper = document.getElementById('cardFlipper');
const invitationWrapper = document.getElementById('invitationWrapper');
const invitationSection = document.getElementById('invitation');

// Reveal on click (still works as before)
flipper.addEventListener('click', () => {
  // Only allow flip if the invitation is currently out of the envelope
  if (invitationWrapper.classList.contains('revealed')) {
    flipper.classList.toggle('flipped');
  }
});
flipper.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (invitationWrapper.classList.contains('revealed')) {
      flipper.classList.toggle('flipped');
    }
  }
});

// Initial reveal: 1 second after page load, invitation slides out
let hasInitiallyRevealed = false;
window.addEventListener('load', () => {
  setTimeout(() => {
    invitationWrapper.classList.add('revealed');
    hasInitiallyRevealed = true;
  }, 1000);
});

// Scroll behaviour: when the invitation section leaves the viewport,
// the invitation goes back into the envelope.
// When it re-enters, it comes back out.
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!hasInitiallyRevealed) return; // wait until initial reveal happened

    if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
      // Section is mostly visible → reveal
      invitationWrapper.classList.add('revealed');
    } else if (entry.intersectionRatio < 0.2) {
      // Section is mostly out of view → hide back into envelope
      invitationWrapper.classList.remove('revealed');
      // Also un-flip when going back in
      flipper.classList.remove('flipped');
    }
  });
}, {
  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
});

sectionObserver.observe(invitationSection);

// flipper.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter' || e.key === ' ') {
//     e.preventDefault();
//     flipper.classList.toggle('flipped');
//   }
// });

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
