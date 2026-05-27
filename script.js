// --- 1) Card flip + envelope reveal animation ---
const flipper = document.getElementById('cardFlipper');
const envelope = document.getElementById('envelope');
const invitationWrapper = document.getElementById('invitationWrapper');
const invitationSection = document.getElementById('invitation');

function reveal() {
  envelope.classList.add('revealed');
  invitationWrapper.classList.add('revealed');
}
function hide() {
  envelope.classList.remove('revealed');
  invitationWrapper.classList.remove('revealed');
  flipper.classList.remove('flipped');
}

flipper.addEventListener('click', () => {
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

let hasInitiallyRevealed = false;
window.addEventListener('load', () => {
  setTimeout(() => {
    reveal();
    hasInitiallyRevealed = true;
  }, 1000);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!hasInitiallyRevealed) return;
    if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
      reveal();
    } else if (entry.intersectionRatio < 0.2) {
      hide();
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
