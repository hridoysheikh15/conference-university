/* =========================================================================
   ICP 2026 — Physics Discipline, Khulna University
   Main JavaScript
   ========================================================================= */
(function ($) {
  "use strict";

  /* ---------------------------------------------------------------------
     0. Preloader
     --------------------------------------------------------------------- */
  $(window).on("load", function () {
    $("#preloader").addClass("hidden");
    setTimeout(function () {
      $("#preloader").remove();
    }, 700);
  });

  /* ---------------------------------------------------------------------
     1. AOS Init
     --------------------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }

  /* ---------------------------------------------------------------------
     2. Sticky Navbar on Scroll
     --------------------------------------------------------------------- */
  const $navbar = $(".navbar-main");
  function handleNavbarScroll() {
    if ($(window).scrollTop() > 60) {
      $navbar.addClass("scrolled");
    } else {
      $navbar.removeClass("scrolled");
    }
  }
  handleNavbarScroll();
  $(window).on("scroll", handleNavbarScroll);

  // Close mobile menu after clicking a link
  $(".nav-link-custom").on("click", function () {
    const $collapse = $(".navbar-collapse");
    if ($collapse.hasClass("show")) {
      bootstrap.Collapse.getOrCreateInstance($collapse[0]).hide();
    }
  });

  // Active link highlight on scroll (scrollspy-lite)
  const sections = $("section[id]");
  function highlightNav() {
    const scrollPos = $(window).scrollTop() + 140;
    sections.each(function () {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr("id");
      const $link = $(`.nav-link-custom[href="#${id}"]`);
      if (scrollPos >= top && scrollPos < bottom) {
        $(".nav-link-custom").removeClass("active");
        $link.addClass("active");
      }
    });
  }
  $(window).on("scroll", highlightNav);

  /* ---------------------------------------------------------------------
     3. Back to Top Button
     --------------------------------------------------------------------- */
  const $backToTop = $(".back-to-top");
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 400) {
      $backToTop.addClass("show");
    } else {
      $backToTop.removeClass("show");
    }
  });
  $backToTop.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  /* ---------------------------------------------------------------------
     4. Countdown Timer
     Conference start date is configurable in a single place below.
     Recalculates every second; auto-detects when the conference has begun.
     --------------------------------------------------------------------- */
  const CountdownTimer = {
    // Update this ISO date to change the conference start date/time.
    targetDate: new Date("2026-12-10T09:00:00+06:00").getTime(),

    els: {
      days: document.getElementById("cd-days"),
      hours: document.getElementById("cd-hours"),
      minutes: document.getElementById("cd-minutes"),
      seconds: document.getElementById("cd-seconds"),
      wrap: document.getElementById("countdown-grid"),
      started: document.getElementById("countdown-started"),
    },

    pad(n) {
      return String(n).padStart(2, "0");
    },

    tick() {
      const now = Date.now();
      const distance = this.targetDate - now;

      if (distance <= 0) {
        if (this.els.wrap) this.els.wrap.style.display = "none";
        if (this.els.started) this.els.started.classList.remove("d-none");
        clearInterval(this.interval);
        return;
      }

      const day = Math.floor(distance / 86400000);
      const hour = Math.floor((distance % 86400000) / 3600000);
      const min = Math.floor((distance % 3600000) / 60000);
      const sec = Math.floor((distance % 60000) / 1000);

      if (this.els.days) this.els.days.textContent = this.pad(day);
      if (this.els.hours) this.els.hours.textContent = this.pad(hour);
      if (this.els.minutes) this.els.minutes.textContent = this.pad(min);
      if (this.els.seconds) this.els.seconds.textContent = this.pad(sec);
    },

    init() {
      if (!this.els.days) return;
      this.tick();
      this.interval = setInterval(() => this.tick(), 1000);
    },
  };
  CountdownTimer.init();

  /* ---------------------------------------------------------------------
     5. Animated Counters (stats section) using CountUp.js
     --------------------------------------------------------------------- */
  const counterEls = document.querySelectorAll(".stat-number[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const endVal = parseInt(el.getAttribute("data-count"), 10);
          if (window.CountUp) {
            const counter = new window.CountUp(
              el.querySelector(".num"),
              endVal,
              {
                duration: 2.2,
                separator: ",",
              },
            );
            if (!counter.error) counter.start();
          } else {
            el.querySelector(".num").textContent = endVal;
          }
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 },
  );
  counterEls.forEach((el) => counterObserver.observe(el));

  /* ---------------------------------------------------------------------
     6. Typed.js — hero rotating role/topics text (optional enhancement)
     --------------------------------------------------------------------- */
  if (window.Typed && document.getElementById("typed-topics")) {
    new Typed("#typed-topics", {
      strings: [
        "Quantum Physics",
        "Astrophysics",
        "Nanotechnology",
        "Materials Science",
        "Computational Physics",
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ---------------------------------------------------------------------
     7. Vanilla Tilt — subtle tilt on speaker / topic cards (optional)
     --------------------------------------------------------------------- */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
      max: 6,
      speed: 400,
      glare: true,
      "max-glare": 0.12,
    });
  }

  /* ---------------------------------------------------------------------
     8. Swiper — Sponsors carousel
     --------------------------------------------------------------------- */
  if (window.Swiper) {
    new Swiper(".sponsors-swiper", {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 2200, disableOnInteraction: false },
      breakpoints: {
        576: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        992: { slidesPerView: 5 },
      },
    });
  }

  /* ---------------------------------------------------------------------
     9. Gallery Lightbox (lightweight, dependency-free)
     --------------------------------------------------------------------- */
  const $lightbox = $(".lightbox-overlay");
  const $lightboxImg = $lightbox.find("img");

  $(document).on("click", ".gallery-item img", function () {
    const fullSrc = $(this).data("full") || $(this).attr("src");
    $lightboxImg.attr("src", fullSrc);
    $lightbox.addClass("active");
    $("body").css("overflow", "hidden");
  });

  function closeLightbox() {
    $lightbox.removeClass("active");
    $("body").css("overflow", "");
  }
  $(".lightbox-close, .lightbox-overlay").on("click", function (e) {
    if (e.target === this || $(e.target).hasClass("lightbox-close")) {
      closeLightbox();
    }
  });
  $(document).on("keyup", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------------------------------------------------------------------
     10. Contact Form — front-end only validation & confirmation
     --------------------------------------------------------------------- */
  const $contactForm = $("#contactForm");
  $contactForm.on("submit", function (e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      e.stopPropagation();
      $(this).addClass("was-validated");
      return;
    }
    const $btn = $(this).find('button[type="submit"]');
    const originalText = $btn.html();
    $btn
      .prop("disabled", true)
      .html('<i class="ri-loader-4-line spin-icon"></i> Sending...');

    setTimeout(function () {
      $btn
        .prop("disabled", false)
        .html('<i class="ri-check-line"></i> Message Sent');
      $contactForm[0].reset();
      $contactForm.removeClass("was-validated");
      setTimeout(() => $btn.html(originalText), 2500);
    }, 1200);
  });

  /* ---------------------------------------------------------------------
     11. Registration Form (if present) — same soft-submit pattern
     --------------------------------------------------------------------- */
  const $regForm = $("#registerForm");
  $regForm.on("submit", function (e) {
    e.preventDefault();
    if (!this.checkValidity()) {
      e.stopPropagation();
      $(this).addClass("was-validated");
      return;
    }
    alert(
      "Thank you for registering! A confirmation email will be sent shortly.",
    );
    $regForm[0].reset();
    $regForm.removeClass("was-validated");
  });
})(jQuery);
