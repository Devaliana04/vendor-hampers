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

  // --- 2. Navbar Reference ---
  const navbar = document.getElementById('navbar-main');

  // --- 3. Fade-Up Intersection Observer ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Immediately reveal above-the-fold content to prevent LCP/FCP delay
  document.querySelectorAll('#hero .fade-up, .hero-section .fade-up, .article-header .fade-up, .breadcrumb-hampers .fade-up').forEach((el) => {
    el.classList.add('visible');
  });

  if (!prefersReducedMotion) {
    const fadeEls = document.querySelectorAll('.fade-up:not(.visible)');
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
        { threshold: 0.01, rootMargin: '0px 0px 150px 0px' }
      );
      fadeEls.forEach((el) => {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('.fade-up').forEach((el) => {
        el.classList.add('visible');
      });
    }
  } else {
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

  // --- 7. Reading Progress Bar, Back-To-Top & Unified Scroll Listener ---
  const articleContent = document.querySelector('.blog-article-content');
  let progBar = null;
  // tocSections now caches offsetTop to prevent forced reflow during scroll
  const tocSections = [];

  if (articleContent) {
    progBar = document.querySelector('.reading-progress-bar');
    if (!progBar) {
      const container = document.createElement('div');
      container.className = 'reading-progress-container';
      progBar = document.createElement('div');
      progBar.className = 'reading-progress-bar';
      container.appendChild(progBar);
      document.body.prepend(container);
    }

    const tocLinks = document.querySelectorAll('.blog-sidebar a[href^="#"]');
    tocLinks.forEach((link) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Cache offsetTop now (not during scroll) to avoid forced reflow
        tocSections.push({ link, el: targetEl, top: 0 });
      }
    });

    // Function to refresh cached positions (call once on load and on resize)
    const refreshTocPositions = () => {
      tocSections.forEach((s) => {
        s.top = s.el.getBoundingClientRect().top + window.scrollY;
      });
    };

    // Cache on load
    if (document.readyState === 'complete') {
      refreshTocPositions();
    } else {
      window.addEventListener('load', refreshTocPositions, { once: true });
    }

    // Re-cache on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refreshTocPositions, 200);
    }, { passive: true });
  }

  // Back to Top Button
  let bttBtn = document.querySelector('.back-to-top-btn');
  if (!bttBtn) {
    bttBtn = document.createElement('button');
    bttBtn.className = 'back-to-top-btn';
    bttBtn.setAttribute('type', 'button');
    bttBtn.setAttribute('aria-label', 'Kembali ke atas halaman');
    bttBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(bttBtn);
  }

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- High-Performance Unified Passive Scroll Listener ---
  let scrollTicking = false;
  const onGlobalScroll = () => {
    const scrollY = window.scrollY;

    // 1. Navbar
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 2. Reading Progress
    if (progBar) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        progBar.style.width = `${Math.min(100, Math.max(0, (scrollY / totalHeight) * 100))}%`;
      }
    }

    // 3. Back to Top Button
    if (bttBtn) {
      if (scrollY > 400) {
        bttBtn.classList.add('visible');
      } else {
        bttBtn.classList.remove('visible');
      }
    }

    // 4. Sidebar TOC Scrollspy — use cached .top instead of offsetTop (no forced reflow)
    if (tocSections.length) {
      const scrollPos = scrollY + 140;
      let current = null;
      for (let i = 0; i < tocSections.length; i++) {
        if (tocSections[i].top <= scrollPos) {
          current = tocSections[i];
        }
      }
      tocSections.forEach((s) => s.link.classList.remove('active', 'fw-bold', 'text-sky'));
      if (current) {
        current.link.classList.add('active');
      }
    }

    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(onGlobalScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  // Initial trigger only if restored scroll position
  if (window.scrollY > 0) {
    window.requestAnimationFrame(onGlobalScroll);
  }

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

