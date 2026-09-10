/* ==========================================================================
   ALEKSANDRA BOCHENEK - NAIL DESIGN | GALLERY & LIGHTBOX JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initLightbox();
  initHeroVideoFallback();
});

/**
 * Filter Gallery Items by Tag
 */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * Fullscreen Luxury Lightbox
 */
function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.modal-close-btn');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const items = Array.from(document.querySelectorAll('.gallery-item'));

  let currentIndex = 0;

  const updateLightbox = (index) => {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;

    const currentItem = items[currentIndex];
    const imgEl = currentItem.querySelector('.gallery-item-img');
    const titleEl = currentItem.querySelector('.gallery-item-title');
    const tagEl = currentItem.querySelector('.gallery-item-tag');

    if (imgEl && lightboxImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Aleksandra Bochenek Nail Design';
    }

    if (lightboxCaption) {
      const title = titleEl ? titleEl.textContent : '';
      const tag = tagEl ? tagEl.textContent : '';
      lightboxCaption.innerHTML = `<span>${title}</span> <span style="display:block; font-size: 0.8rem; color: var(--gold-light); text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px;">${tag}</span>`;
    }
  };

  const openLightbox = (index) => {
    updateLightbox(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  items.forEach((item, idx) => {
    item.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex + 1);
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-dialog')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
  });
}

/**
 * Hero Background Video Handling & Low Power Fallback
 */
function initHeroVideoFallback() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.log('Video autoplay prevented by browser power settings; poster fallback is active.');
    });
  }
}
