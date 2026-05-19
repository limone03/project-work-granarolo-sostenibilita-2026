
Copia

document.addEventListener("DOMContentLoaded", function () {
 
  /* ---- SIDEBAR ---- */
  const menuToggle = document.getElementById("menuToggle");
  const menuToggleHeader = document.getElementById("menuToggleHeader");
  const sideNav = document.getElementById("sideNav");
  const menuClose = document.getElementById("menuClose");
  const menuOverlay = document.getElementById("menuOverlay");
 
  function openMenu() {
    sideNav.classList.add("open");
    menuOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
  }
 
  function closeMenu() {
    sideNav.classList.remove("open");
    menuOverlay.classList.remove("show");
    document.body.style.overflow = "";
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }
 
  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (menuToggleHeader) menuToggleHeader.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);
 
  if (sideNav) {
    sideNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
 
  /* ---- SCROLL: progress bar + sticky bar + back-to-top ---- */
  const progressBar = document.getElementById("progressBar");
  const backToTop = document.getElementById("backToTop");
  const stickyBar = document.getElementById("stickyBar");
  const headerEl = document.querySelector("header");
 
  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
 
    /* Barra progresso */
    if (progressBar && docHeight > 0) {
      progressBar.style.width = ((scrollTop / docHeight) * 100) + "%";
    }
 
    /* Back to top */
    if (backToTop) {
      if (scrollTop > 300) backToTop.classList.add("show");
      else backToTop.classList.remove("show");
    }
 
    /* Sticky bar: compare quando l'header esce dalla viewport */
    if (stickyBar && headerEl) {
      const headerBottom = headerEl.getBoundingClientRect().bottom;
      if (headerBottom < 0) stickyBar.classList.add("visible");
      else stickyBar.classList.remove("visible");
    }
  }
 
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
 
  /* ---- SCROLL ANIMATIONS (IntersectionObserver) ---- */
  const animated = document.querySelectorAll(".animate-on-scroll");
 
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
 
    animated.forEach(function (el) { obs.observe(el); });
  } else {
    animated.forEach(function (el) { el.classList.add("visible"); });
  }
 
  /* ---- CARD AZIONI: toggle espansione ---- */
  document.querySelectorAll(".scopri-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const card = btn.closest(".azione-card");
      if (!card) return;
 
      const aperta = card.classList.toggle("aperta");
      const extra = card.querySelector(".azione-extra");
      btn.setAttribute("aria-expanded", aperta ? "true" : "false");
 
      if (extra) {
        if (aperta) {
          extra.removeAttribute("hidden");
          extra.style.animation = "none";
          requestAnimationFrame(function () {
            extra.style.animation = "";
          });
        } else {
          extra.setAttribute("hidden", "");
        }
      }
 
      /* Testo bottone */
      const testo = btn.childNodes[0];
      if (testo && testo.nodeType === Node.TEXT_NODE) {
        testo.textContent = aperta ? "Mostra meno " : "Scopri di più ";
      }
    });
  });
 
  /* ---- NUMERI ANIMATI ---- */
  function animaContatore(card) {
    const valSpan = card.querySelector(".nc-value");
    if (!valSpan) return;
 
    const target = parseInt(card.getAttribute("data-target"), 10);
    const prefisso = card.getAttribute("data-prefix") || "";
    const suffisso = card.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;
 
    let corrente = 0;
    const durata = 950;
    const step = target / (durata / 18);
 
    clearInterval(card._timer);
    valSpan.textContent = prefisso + "0" + suffisso;
 
    card._timer = setInterval(function () {
      corrente += step;
      if (corrente >= target) {
        corrente = target;
        clearInterval(card._timer);
      }
      valSpan.textContent =
        prefisso +
        Math.floor(corrente).toLocaleString("it-IT") +
        suffisso;
    }, 18);
  }
 
  document.querySelectorAll(".numero-card").forEach(function (card) {
    /* Bottone ↺ */
    const btn = card.querySelector(".anim-btn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        animaContatore(card);
      });
    }
 
    /* Click sulla card intera */
    card.addEventListener("click", function () { animaContatore(card); });
 
    /* Touch su mobile */
    card.addEventListener("touchstart", function () { animaContatore(card); }, { passive: true });
  });
 
  /* Anima automaticamente quando entrano in vista */
  if ("IntersectionObserver" in window) {
    const numObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(function () { animaContatore(entry.target); }, 200);
          numObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
 
    document.querySelectorAll(".numero-card").forEach(function (card) {
      numObs.observe(card);
    });
  }
 
});
