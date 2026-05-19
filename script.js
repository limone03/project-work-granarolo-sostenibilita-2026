document.addEventListener("DOMContentLoaded", function () {

  /* Sidebar */
  const menuToggle = document.getElementById("menuToggle");
  const sideNav = document.getElementById("sideNav");
  const menuClose = document.getElementById("menuClose");
  const menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    sideNav.classList.add("open");
    menuOverlay.classList.add("show");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    sideNav.classList.remove("open");
    menuOverlay.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && sideNav && menuClose && menuOverlay) {
    menuToggle.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);
    menuOverlay.addEventListener("click", closeMenu);

    sideNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", closeMenu);
    });
  }

  /* Barra di avanzamento durante lo scroll */
  const progressBar = document.getElementById("progressBar");
  const backToTop = document.getElementById("backToTop");

  function aggiornaScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && documentHeight > 0) {
      const scrollPercent = (scrollTop / documentHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    }

    if (backToTop) {
      if (scrollTop > 250) backToTop.classList.add("show");
      else backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", aggiornaScroll, { passive: true });
  window.addEventListener("load", aggiornaScroll);
  aggiornaScroll();

  /* Animazione degli elementi quando entrano nello schermo */
  const elementiAnimati = document.querySelectorAll(".animate-on-scroll");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });

    elementiAnimati.forEach(function (elemento) {
      observer.observe(elemento);
    });
  } else {
    elementiAnimati.forEach(function (elemento) {
      elemento.classList.add("visible");
    });
  }

  /* Card azioni - apertura contenuto extra */
  const pulsantiScopri = document.querySelectorAll(".scopri-btn");

  pulsantiScopri.forEach(function (pulsante) {
    pulsante.addEventListener("click", function (event) {
      event.preventDefault();

      const card = pulsante.closest(".azione-card");
      if (!card) return;

      card.classList.toggle("aperta");

      const contenutoExtra = card.querySelector(".azione-extra");

      if (card.classList.contains("aperta")) {
        pulsante.textContent = "Mostra meno";
        if (contenutoExtra) contenutoExtra.style.display = "block";
      } else {
        pulsante.textContent = "Scopri di più";
        if (contenutoExtra) contenutoExtra.style.display = "none";
      }
    });
  });

  /* Funzione per animare un singolo contatore */
  function animaContatore(contatore) {
    const valoreFinale = parseInt(contatore.getAttribute("data-target"), 10);
    const prefisso = contatore.getAttribute("data-prefix") || "";
    const suffisso = contatore.getAttribute("data-suffix") || "";

    if (isNaN(valoreFinale)) return;

    let valoreAttuale = 0;
    const durata = 900;
    const incremento = valoreFinale / (durata / 20);

    clearInterval(contatore.timer);

    contatore.textContent = prefisso + "0" + suffisso;

    contatore.timer = setInterval(function () {
      valoreAttuale += incremento;

      if (valoreAttuale >= valoreFinale) {
        valoreAttuale = valoreFinale;
        clearInterval(contatore.timer);
      }

      contatore.textContent =
        prefisso +
        Math.floor(valoreAttuale).toLocaleString("it-IT") +
        suffisso;
    }, 20);
  }

  /* Numeri animati: hover (desktop) + click/tap (mobile) */
  const cardNumeri = document.querySelectorAll(".numeri-grid article");

  cardNumeri.forEach(function (card) {
    const contatore = card.querySelector(".counter");
    if (!contatore) return;

    card.addEventListener("mouseenter", function () {
      animaContatore(contatore);
    });

    card.addEventListener("click", function () {
      animaContatore(contatore);
    });

    card.addEventListener("touchstart", function () {
      animaContatore(contatore);
    }, { passive: true });
  });

  /* Partenza automatica quando si arriva alla sezione "Numeri" (una volta sola) */
  const sezioneNumeri = document.getElementById("numeri");
  let contatoriPartiti = false;

  if (sezioneNumeri && "IntersectionObserver" in window) {
    const obsNumeri = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !contatoriPartiti) {
          contatoriPartiti = true;

          document.querySelectorAll(".numeri-grid .counter").forEach((c) => {
            animaContatore(c);
          });

          obsNumeri.disconnect();
        }
      });
    }, { threshold: 0.35 });

    obsNumeri.observe(sezioneNumeri);
  }

});
