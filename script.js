document.addEventListener("DOMContentLoaded", function () {

  /* =============================================
     SPLASH CON PARTICELLE
     ============================================= */
  const splash = document.getElementById("splash");
  const splashParticles = document.getElementById("splashParticles");

  if (splash) {
    if (splashParticles) {
      for (let i = 0; i < 12; i++) {
        const p = document.createElement("span");
        p.className = "splash-particle";
        p.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 0.8}s;
          animation-duration: ${0.6 + Math.random() * 0.6}s;
          width: ${4 + Math.random() * 6}px;
          height: ${4 + Math.random() * 6}px;
        `;
        splashParticles.appendChild(p);
      }
    }

    setTimeout(() => {
      splash.classList.add("hide");
      setTimeout(() => splash.remove(), 400);
    }, 1200);
  }

  /* =============================================
     DARK MODE
     ============================================= */
  const darkToggle = document.getElementById("darkToggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (localStorage.getItem("darkMode") === "1" || (prefersDark && localStorage.getItem("darkMode") === null)) {
    document.body.classList.add("dark");
    if (darkToggle) darkToggle.textContent = "☀️";
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      darkToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("darkMode", isDark ? "1" : "0");
    });
  }

  /* =============================================
     SIDEBAR
     ============================================= */
  const menuToggle = document.getElementById("menuToggle");
  const sideNav = document.getElementById("sideNav");
  const menuClose = document.getElementById("menuClose");
  const menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    if (!sideNav || !menuOverlay || !menuToggle) return;
    sideNav.classList.add("open");
    menuOverlay.classList.add("show");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!sideNav || !menuOverlay || !menuToggle) return;
    sideNav.classList.remove("open");
    menuOverlay.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && sideNav && menuClose && menuOverlay) {
    menuToggle.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);
    menuOverlay.addEventListener("click", closeMenu);
    sideNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  }

  /* =============================================
     SCROLLSPY SIDEBAR (IntersectionObserver)
     Evidenzia il link della sezione visibile
     ============================================= */
  (function () {
    const sideNavEl = document.getElementById("sideNav");
    if (!sideNavEl) return;

    const links = Array.from(sideNavEl.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    const sections = links
      .map(a => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    if (!sections.length) return;

    let currentId = null;

    function setActive(id) {
      if (!id || currentId === id) return;
      currentId = id;

      links.forEach(a => a.classList.remove("spy-active"));
      const activeLink = sideNavEl.querySelector(`a[href="#${CSS.escape(id)}"]`);
      if (activeLink) activeLink.classList.add("spy-active");
    }

    // fallback (se IO non disponibile)
    if (!("IntersectionObserver" in window)) {
      window.addEventListener("scroll", () => {
        const y = window.scrollY + 140;
        for (let i = sections.length - 1; i >= 0; i--) {
          const s = sections[i];
          if (s.offsetTop <= y) {
            setActive(s.id);
            break;
          }
        }
      }, { passive: true });

      setActive(sections[0].id);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        setActive(visible.target.id);
      }
    }, {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: "-10% 0px -55% 0px"
    });

    sections.forEach(sec => observer.observe(sec));
    setActive(sections[0].id);
  })();

  /* =============================================
     BARRA PROGRESSO + BACK TO TOP
     ============================================= */
  const progressBar = document.getElementById("progressBar");
  const backToTop = document.getElementById("backToTop");

  function aggiornaScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && documentHeight > 0) {
      progressBar.style.width = ((scrollTop / documentHeight) * 100) + "%";
    }

    if (backToTop) {
      if (scrollTop > 250) backToTop.classList.add("show");
      else backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", aggiornaScroll, { passive: true });
  window.addEventListener("load", aggiornaScroll);
  aggiornaScroll();

  /* =============================================
     ANIMAZIONE INGRESSO
     ============================================= */
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
    elementiAnimati.forEach(el => el.classList.add("visible"));
  }

  /* =============================================
     CONTATORI ANIMATI
     ============================================= */
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

  const cardNumeri = document.querySelectorAll(".numeri-grid article");
  cardNumeri.forEach(function (card) {
    const contatore = card.querySelector(".counter");
    if (!contatore) return;

    card.addEventListener("mouseenter", () => animaContatore(contatore));
    card.addEventListener("click", () => animaContatore(contatore));
    card.addEventListener("touchstart", () => animaContatore(contatore), { passive: true });
  });

  const sezioneNumeri = document.getElementById("numeri");
  let contatoriPartiti = false;

  if (sezioneNumeri && "IntersectionObserver" in window) {
    const obsNumeri = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !contatoriPartiti) {
          contatoriPartiti = true;
          document.querySelectorAll(".numeri-grid .counter").forEach(c => animaContatore(c));
          obsNumeri.disconnect();
        }
      });
    }, { threshold: 0.35 });

    obsNumeri.observe(sezioneNumeri);
  }

  /* =============================================
     TOOLTIP CARD AZIONI (hover desktop)
     ============================================= */
  document.querySelectorAll(".azione-card[data-tooltip]").forEach(card => {
    const tooltip = card.querySelector(".card-tooltip");
    if (!tooltip) return;

    tooltip.textContent = card.getAttribute("data-tooltip");

    card.addEventListener("mouseenter", () => tooltip.classList.add("visible"));
    card.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
    card.addEventListener("focus", () => tooltip.classList.add("visible"));
    card.addEventListener("blur", () => tooltip.classList.remove("visible"));
  });

  /* =============================================
     TIMELINE INTERATTIVA
     ============================================= */
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach(item => {
    item.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      timelineItems.forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  if (timelineItems.length > 0) timelineItems[0].classList.add("open");

  /* =============================================
     QUIZ INTERATTIVO
     ============================================= */
  const domande = [
    {
      testo: "Quante tonnellate di CO₂ equivalente l'anno si stima di ridurre grazie al progetto biometano?",
      opzioni: ["20.000 t", "60.000 t", "100.000 t", "40.000 t"],
      corretta: 1,
      spiegazione: "Il progetto biometano punta a una riduzione stimata di 60.000 t di CO₂ eq/anno, valorizzando i sottoprodotti della filiera come fonte di energia rinnovabile."
    },
    {
      testo: "Qual è l'obiettivo di riduzione delle emissioni lungo la filiera entro il 2030?",
      opzioni: ["-10%", "-50%", "-30%", "-20%"],
      corretta: 2,
      spiegazione: "L'obiettivo fissato è una riduzione del 30% delle emissioni lungo tutta la filiera entro il 2030."
    },
    {
      testo: "Quanti allevamenti sono monitorati con attività di misurazione continua?",
      opzioni: ["Oltre 20", "Oltre 50", "Oltre 80", "Oltre 120"],
      corretta: 2,
      spiegazione: "Più di 80 allevamenti partner sono coinvolti nel programma di monitoraggio e miglioramento continuo."
    },
    {
      testo: "Quale tra questi è uno dei pilastri della strategia di sostenibilità?",
      opzioni: ["Packaging biodegradabile", "Pratiche agronomiche", "Energia solare negli uffici", "Riduzione del personale"],
      corretta: 1,
      spiegazione: "Le pratiche agronomiche rappresentano uno dei pilastri strategici, puntando a uso più efficiente del suolo e cattura CO₂."
    },
    {
      testo: "Cosa caratterizza l'approccio alla sostenibilità?",
      opzioni: [
        "Interventi solo sul packaging",
        "Certificazioni senza obiettivi misurabili",
        "Azioni concrete a monte della filiera, misurabili e verificabili",
        "Comunicazione senza dati"
      ],
      corretta: 2,
      spiegazione: "Approccio basato su misurazioni concrete e interventi diretti nella filiera a monte."
    }
  ];

  let quizIndex = 0;
  let quizPunteggio = 0;
  let quizRispostaData = false;

  const quizDomandaEl = document.getElementById("quizDomanda");
  const quizOpzioniEl = document.getElementById("quizOpzioni");
  const quizFeedbackEl = document.getElementById("quizFeedback");
  const quizNextEl = document.getElementById("quizNext");
  const quizRisultatoEl = document.getElementById("quizRisultato");
  const quizCounterEl = document.getElementById("quizCounter");
  const quizProgressBarEl = document.getElementById("quizProgressBar");
  const quizScoreCircle = document.getElementById("quizScoreCircle");
  const quizRisultatoTitolo = document.getElementById("quizRisultatoTitolo");
  const quizRisultatoTesto = document.getElementById("quizRisultatoTesto");

  function mostraDomanda() {
    if (!quizDomandaEl || !quizOpzioniEl) return;

    quizRispostaData = false;
    const d = domande[quizIndex];

    if (quizCounterEl) quizCounterEl.textContent = `Domanda ${quizIndex + 1} di ${domande.length}`;
    if (quizProgressBarEl) quizProgressBarEl.style.width = ((quizIndex / domande.length) * 100) + "%";

    quizDomandaEl.textContent = d.testo;
    quizOpzioniEl.innerHTML = "";
    if (quizFeedbackEl) {
      quizFeedbackEl.textContent = "";
      quizFeedbackEl.className = "quiz-feedback";
    }
    if (quizNextEl) quizNextEl.style.display = "none";

    d.opzioni.forEach((opzione, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-opzione";
      btn.textContent = opzione;

      btn.addEventListener("click", function () {
        if (quizRispostaData) return;
        quizRispostaData = true;

        const corretta = d.corretta;

        quizOpzioniEl.querySelectorAll(".quiz-opzione").forEach((b, bi) => {
          b.disabled = true;
          if (bi === corretta) b.classList.add("corretta");
          else if (bi === i && i !== corretta) b.classList.add("sbagliata");
        });

        const ok = (i === corretta);
        if (ok) quizPunteggio++;

        if (quizFeedbackEl) {
          quizFeedbackEl.textContent = (ok ? "Corretto! " : "No. ") + d.spiegazione;
          quizFeedbackEl.classList.add(ok ? "ok" : "no");
        }

        if (quizNextEl) quizNextEl.style.display = "inline-block";
      });

      quizOpzioniEl.appendChild(btn);
    });
  }

  function mostraRisultato() {
    if (quizRisultatoEl) quizRisultatoEl.style.display = "block";
    if (quizNextEl) quizNextEl.style.display = "none";
    if (quizDomandaEl) quizDomandaEl.textContent = "Quiz completato";
    if (quizOpzioniEl) quizOpzioniEl.innerHTML = "";

    const tot = domande.length;
    const score = quizPunteggio;

    if (quizScoreCircle) quizScoreCircle.textContent = `${score}/${tot}`;

    if (quizRisultatoTitolo) {
      quizRisultatoTitolo.textContent = score === tot ? "Perfetto!" :
        score >= Math.ceil(tot * 0.7) ? "Ottimo!" :
        score >= Math.ceil(tot * 0.4) ? "Buono!" : "Da ripassare";
    }

    if (quizRisultatoTesto) {
      quizRisultatoTesto.textContent = `Hai totalizzato ${score} risposte corrette su ${tot}.`;
    }

    if (quizProgressBarEl) quizProgressBarEl.style.width = "100%";
  }

  if (quizNextEl) {
    quizNextEl.addEventListener("click", function () {
      quizIndex++;
      if (quizIndex >= domande.length) mostraRisultato();
      else mostraDomanda();
    });
  }

  // Avvia quiz se presente nella pagina
  if (quizDomandaEl && quizOpzioniEl) mostraDomanda();

});
