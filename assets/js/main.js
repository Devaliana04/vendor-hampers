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

  // --- 4. Vanilla Mobile Navbar, Dropdown & Accordion (Zero Bootstrap JS dependency) ---
  const navbarCollapse = document.getElementById('navbarMain');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
      const isExpanded = navbarCollapse.classList.contains('show');
      navbarToggler.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  if (navbarCollapse) {
    const navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbarCollapse.classList.remove('show');
        if (navbarToggler) navbarToggler.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll('.dropdown-toggle').forEach((toggleBtn) => {
    toggleBtn.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        const menu = toggleBtn.nextElementSibling;
        if (menu && menu.classList.contains('dropdown-menu')) {
          menu.classList.toggle('show');
        }
      }
    });
  });

  // Vanilla Accordion (for FAQ and other collapse accordions)
  document.querySelectorAll('.accordion-button[data-bs-toggle="collapse"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-bs-target');
      const target = targetSelector ? document.querySelector(targetSelector) : null;
      if (!target) return;

      const parentSelector = target.getAttribute('data-bs-parent');
      if (parentSelector) {
        document.querySelectorAll(`${parentSelector} .accordion-collapse.show`).forEach((openEl) => {
          if (openEl !== target) openEl.classList.remove('show');
        });
        document.querySelectorAll(`${parentSelector} .accordion-button:not(.collapsed)`).forEach((openBtn) => {
          if (openBtn !== btn) openBtn.classList.add('collapsed');
        });
      }

      target.classList.toggle('show');
      btn.classList.toggle('collapsed');
      const isExpanded = target.classList.contains('show');
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  });

  // Vanilla Modal (Zero Bootstrap JS dependency)
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal.show')) {
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('[data-bs-toggle="modal"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-bs-target') || btn.getAttribute('href');
      if (targetSelector) {
        const targetModal = document.querySelector(targetSelector);
        if (targetModal) openModal(targetModal);
      }
    });
  });

  document.querySelectorAll('[data-bs-dismiss="modal"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentModal = btn.closest('.modal');
      if (parentModal) closeModal(parentModal);
    });
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.show');
      if (activeModal) closeModal(activeModal);
    }
  });

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

  // --- Floating Scroll Navigation Dock (Up & Down / Balik ke Awal & Scroll Cepat) ---
  let scrollDock = document.getElementById('scrollNavDock');
  if (!scrollDock) {
    scrollDock = document.createElement('div');
    scrollDock.className = 'scroll-nav-dock';
    scrollDock.id = 'scrollNavDock';
    scrollDock.setAttribute('role', 'group');
    scrollDock.setAttribute('aria-label', 'Navigasi Halaman Cepat');
    scrollDock.innerHTML = `
      <button class="scroll-nav-btn scroll-nav-up" type="button" id="scrollNavUp" aria-label="Kembali ke awal halaman" title="Kembali ke Awal (Atas)">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
        </svg>
      </button>
      <button class="scroll-nav-btn scroll-nav-down" type="button" id="scrollNavDown" aria-label="Scroll ke bawah" title="Scroll ke Bawah">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
        </svg>
      </button>
    `;
    document.body.appendChild(scrollDock);
  }

  const btnUp = document.getElementById('scrollNavUp');
  const btnDown = document.getElementById('scrollNavDown');

  if (btnUp) {
    btnUp.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (btnDown) {
    btnDown.addEventListener('click', () => {
      const step = Math.round(window.innerHeight * 0.8);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (window.scrollY + step >= maxScroll - 60) {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: step, behavior: 'smooth' });
      }
    });

    btnDown.addEventListener('dblclick', () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    });
  }

  const oldBttBtn = document.querySelector('.back-to-top-btn');
  if (oldBttBtn) {
    oldBttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Reading progress height caching (only executed if progBar exists on article pages)
  let cachedTotalScrollHeight = 0;
  if (progBar) {
    const updateCachedScrollMetrics = () => {
      window.requestAnimationFrame(() => {
        cachedTotalScrollHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      });
    };
    if (document.readyState === 'complete') {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(updateCachedScrollMetrics);
      } else {
        setTimeout(updateCachedScrollMetrics, 300);
      }
    } else {
      window.addEventListener('load', () => {
        if (window.requestIdleCallback) {
          window.requestIdleCallback(updateCachedScrollMetrics);
        } else {
          setTimeout(updateCachedScrollMetrics, 300);
        }
      }, { once: true });
    }
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCachedScrollMetrics, 200);
    }, { passive: true });
  }

  // --- High-Performance Unified Passive Scroll Listener (Zero Forced Reflow) ---
  let scrollTicking = false;
  let navbarIsScrolled = false;
  let bttIsVisible = false;

  const onGlobalScroll = () => {
    const scrollY = window.scrollY;

    // 1. Navbar (Only toggle when boolean state changes to prevent DOM thrashing)
    const shouldScroll = scrollY > 20;
    if (navbar && navbarIsScrolled !== shouldScroll) {
      navbarIsScrolled = shouldScroll;
      navbar.classList.toggle('scrolled', shouldScroll);
    }

    // 2. Reading Progress (Uses cached metrics, zero forced reflow)
    if (progBar && cachedTotalScrollHeight > 0) {
      progBar.style.width = `${Math.min(100, Math.max(0, (scrollY / cachedTotalScrollHeight) * 100))}%`;
    }

    // 3. Scroll Nav Dock state (subtly dim Up button when at top, Down when at bottom)
    if (btnUp) {
      btnUp.classList.toggle('dimmed', scrollY < 80);
    }
    if (btnDown) {
      const maxScroll = (cachedTotalScrollHeight > 0) ? cachedTotalScrollHeight : (document.documentElement.scrollHeight - window.innerHeight);
      btnDown.classList.toggle('dimmed', scrollY >= maxScroll - 50);
    }
    if (oldBttBtn && bttIsVisible !== (scrollY > 400)) {
      bttIsVisible = scrollY > 400;
      oldBttBtn.classList.toggle('visible', bttIsVisible);
    }

    // 4. Sidebar TOC Scrollspy (Uses cached .top)
    if (tocSections.length) {
      const scrollPos = scrollY + 140;
      let current = null;
      for (let i = 0; i < tocSections.length; i++) {
        if (tocSections[i].top <= scrollPos) {
          current = tocSections[i];
        }
      }
      if (current && !current.link.classList.contains('active')) {
        tocSections.forEach((s) => s.link.classList.remove('active', 'fw-bold', 'text-sky'));
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

