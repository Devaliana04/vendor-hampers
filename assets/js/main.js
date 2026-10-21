/**
 * VENDOR HAMPERS — Main JavaScript
 * Vanilla JS for custom interactions
 */

(function () {
  'use strict';

  // --- 1. Dynamic Year in Footer ---
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- 2. Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar-main');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- 3. Fade-Up Intersection Observer ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '0px 0px 100px 0px' }
      );
      fadeEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add('visible');
        } else {
          observer.observe(el);
        }
      });
    } else {
      document.querySelectorAll('.fade-up').forEach((el) => {
        el.classList.add('visible');
      });
    }
  } else {
    // If reduced motion, make everything visible immediately
    document.querySelectorAll('.fade-up').forEach((el) => {
      el.classList.add('visible');
    });
  }

  // --- 4. Close Mobile Navbar on Link Click ---
  const navbarCollapse = document.getElementById('navbarMain');
  if (navbarCollapse) {
    const navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });

    // Also close on dropdown item click
    const dropdownItems = navbarCollapse.querySelectorAll('.dropdown-item');
    dropdownItems.forEach((item) => {
      item.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // --- 5. Portfolio & Paket Filter ---
  const filterContainers = document.querySelectorAll('.filter-buttons, .paket-category-nav');
  filterContainers.forEach((container) => {
    const btns = container.querySelectorAll('.filter-btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update active state within container
        btns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const filter = btn.dataset.filter;
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach((item) => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            item.style.opacity = '1';
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
          }
        });
      });
    });
  });

  // --- 6. Contact Form → WhatsApp ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form validation
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach((field) => {
        let fieldValid = true;
        if (field.type === 'checkbox') {
          fieldValid = field.checked;
        } else {
          fieldValid = field.value.trim().length > 0;
        }

        if (!fieldValid) {
          field.classList.add('is-invalid');
          isValid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (!isValid) return;

      // Build WhatsApp message
      const nama = contactForm.querySelector('#nama')?.value || '';
      const perusahaan = contactForm.querySelector('#perusahaan')?.value || '';
      const kontak = contactForm.querySelector('#kontak')?.value || '';
      const kategori = contactForm.querySelector('#kategori')?.value || '';
      const kuantitas = contactForm.querySelector('#kuantitas')?.value || '';
      const tanggal = contactForm.querySelector('#tanggal')?.value || '';
      const wilayah = contactForm.querySelector('#wilayah')?.value || '';
      const anggaran = contactForm.querySelector('#anggaran')?.value || '';
      const catatan = contactForm.querySelector('#catatan')?.value || '';

      let msg = `Halo, saya ingin meminta penawaran hampers.\n\n`;
      msg += `Nama: ${nama}\n`;
      if (perusahaan) msg += `Perusahaan: ${perusahaan}\n`;
      if (kontak) msg += `Kontak: ${kontak}\n`;
      if (kategori) msg += `Kategori: ${kategori}\n`;
      if (kuantitas) msg += `Estimasi jumlah: ${kuantitas}\n`;
      if (tanggal) msg += `Tanggal dibutuhkan: ${tanggal}\n`;
      if (wilayah) msg += `Wilayah pengiriman: ${wilayah}\n`;
      if (anggaran) msg += `Anggaran: ${anggaran}\n`;
      if (catatan) msg += `Catatan: ${catatan}\n`;
      msg += `\nTerima kasih.`;

      const waUrl = `https://wa.me/6282144267826?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Show success message
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    // Clear validation on input or change
    contactForm.querySelectorAll('.form-control, .form-select, .form-check-input').forEach((field) => {
      const clearInvalid = () => field.classList.remove('is-invalid');
      field.addEventListener('input', clearInvalid);
      field.addEventListener('change', clearInvalid);
    });
  }

  // --- 7. Reading Progress Bar & TOC Scrollspy for Articles ---
  const articleContent = document.querySelector('.blog-article-content');
  if (articleContent) {
    // Inject reading progress bar
    let progBar = document.querySelector('.reading-progress-bar');
    if (!progBar) {
      const container = document.createElement('div');
      container.className = 'reading-progress-container';
      progBar = document.createElement('div');
      progBar.className = 'reading-progress-bar';
      container.appendChild(progBar);
      document.body.prepend(container);
    }

    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        progBar.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    updateReadingProgress();

    // Scrollspy for sidebar Table of Contents
    const tocLinks = document.querySelectorAll('.blog-sidebar a[href^="#"]');
    const sections = [];
    tocLinks.forEach((link) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        sections.push({ link, el: targetEl });
      }
    });

    if (sections.length) {
      const onSpyScroll = () => {
        const scrollPos = window.scrollY + 140;
        let current = null;
        for (let i = 0; i < sections.length; i++) {
          if (sections[i].el.offsetTop <= scrollPos) {
            current = sections[i];
          }
        }
        sections.forEach((s) => s.link.classList.remove('active', 'fw-bold', 'text-sky'));
        if (current) {
          current.link.classList.add('active');
        }
      };
      window.addEventListener('scroll', onSpyScroll, { passive: true });
      onSpyScroll();
    }
  }

  // --- 8. Back to Top Floating Button ---
  let bttBtn = document.querySelector('.back-to-top-btn');
  if (!bttBtn) {
    bttBtn = document.createElement('button');
    bttBtn.className = 'back-to-top-btn';
    bttBtn.setAttribute('type', 'button');
    bttBtn.setAttribute('aria-label', 'Kembali ke atas halaman');
    bttBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(bttBtn);
  }

  const handleBttVisibility = () => {
    if (window.scrollY > 400) {
      bttBtn.classList.add('visible');
    } else {
      bttBtn.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', handleBttVisibility, { passive: true });
  handleBttVisibility();

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- 9. Copy Link Share Button with Toast Feedback ---
  document.querySelectorAll('.share-btn.share-copy').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i> Disalin!';
        btn.style.background = '#287d57';
        btn.style.color = '#ffffff';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = '';
          btn.style.color = '';
        }, 2200);
      });
    });
  });

  // --- 10. Animated Stats Counter ---
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1800;
      const start = performance.now();
      const step = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString('id-ID');
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString('id-ID');
        }
      };
      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

})();

