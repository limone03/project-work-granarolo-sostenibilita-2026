document.addEventListener("DOMContentLoaded", function () {

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


  /* Card azioni - apertura contenuto extra (smooth) */
  const pulsantiScopri = document.querySelectorAll(".scopri-btn");

  pulsantiScopri.forEach(function (pulsante) {
    pulsante.addEventListener("click", function (event) {
      event.preventDefault();

      const card = pulsante.closest(".azione-card");
      if (!card) return;

      const contenutoExtra = card.querySelector(".azione-extra");
      if (!contenutoExtra) return;

      const aperta = card.classList.toggle("aperta");

      if (aperta) {
        pulsante.textContent = "Mostra meno";

        // animazione apertura
        contenutoExtra.style.display = "block";
        contenutoExtra.style.overflow = "hidden";
        contenutoExtra.style.maxHeight = "0px";
        contenutoExtra.style.opacity = "0";

        requestAnimationFrame(() => {
          contenutoExtra.style.transition = "max-height 0.25s ease, opacity 0.25s ease";
          contenutoExtra.style.maxHeight = contenutoExtra.scrollHeight + "px";
          contenutoExtra.style.opacity = "1";
        });

      } else {
        pulsante.textContent = "Scopri di più";

        // animazione chiusura
        contenutoExtra.style.transition = "max-height 0.22s ease, opacity 0.22s ease";
        contenutoExtra.style.maxHeight = "0px";
        contenutoExtra.style.opacity = "0";

        setTimeout(() => {
          contenutoExtra.style.display = "none";
        }, 230);
      }
    });
  });


  /* Funzione per animare un singolo contatore */
  function animaContatore(contatore) {
    const rawTarget = contatore.getAttribute("data-target");
    const valoreFinale = parseInt(rawTarget, 10);

    if (isNaN(valoreFinale)) return;

    const prefisso = contatore.getAttribute("data-prefix") || "";
    const suffisso = contatore.getAttribute("data-suffix") || "";

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


  /* Numeri animati: hover/click/tap (resta) */
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


  /* (NUOVO) Contatori che partono quando si arriva alla sezione Numeri */
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


  /* (NUOVO) Evidenzia la sezione attiva nel menu mentre si scorre */
  const linksMenu = document.querySelectorAll("nav a[href^='#']");
  const sezioni = Array.from(linksMenu)
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (sezioni.length && "IntersectionObserver" in window) {
    const obsMenu = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          linksMenu.forEach(l => l.classList.remove("active"));
          const linkAttivo = document.querySelector(`nav a[href="#${entry.target.id}"]`);
          if (linkAttivo) linkAttivo.classList.add("active");
        }
      });
    }, { threshold: 0.45 });

    sezioni.forEach(sec => obsMenu.observe(sec));
  }

});
