document.addEventListener("DOMContentLoaded", function () {

  /* =============================================
     SPLASH CON PARTICELLE
     ============================================= */
  const splash = document.getElementById("splash");
  const splashParticles = document.getElementById("splashParticles");

  if (splash) {
    // Genera particelle nello splash
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

  // Carica preferenza salvata
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
    sideNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  }

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

      // Chiudi tutti
      timelineItems.forEach(i => i.classList.remove("open"));

      // Apri questo se era chiuso
      if (!isOpen) item.classList.add("open");
    });
  });

  // Apri il primo di default
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
      spiegazione: "L'obiettivo fissato da Granarolo è una riduzione del 30% delle emissioni lungo tutta la filiera entro il 2030."
    },
    {
      testo: "Quanti allevamenti sono monitorati con attività di misurazione continua?",
      opzioni: ["Oltre 20", "Oltre 50", "Oltre 80", "Oltre 120"],
      corretta: 2,
      spiegazione: "Più di 80 allevamenti partner sono coinvolti nel programma di monitoraggio e miglioramento continuo di Granarolo."
    },
    {
      testo: "Quale tra questi è uno dei 5 pilastri della strategia di sostenibilità Granarolo?",
      opzioni: ["Packaging biodegradabile", "Pratiche agronomiche", "Energia solare negli uffici", "Riduzione del personale"],
      corretta: 1,
      spiegazione: "Le pratiche agronomiche rappresentano uno dei 5 pilastri strategici, puntando a un uso più efficiente del suolo e alla cattura della CO₂."
    },
    {
      testo: "Cosa caratterizza l'approccio di Granarolo alla sostenibilità?",
      opzioni: [
        "Interventi solo a livello di packaging",
        "Certificazioni senza obiettivi misurabili",
        "Azioni concrete a monte della filiera, misurabili e verificabili",
        "Comunicazione senza dati"
      ],
      corretta: 2,
      spiegazione: "Granarolo adotta un approccio basato su misurazioni concrete e interventi diretti negli allevamenti e nella filiera 'a monte', rendendo la sostenibilità verificabile."
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
    if (!quizDomandaEl) return;

    quizRispostaData = false;
    const d = domande[quizIndex];

    // Aggiorna contatore e progress
    if (quizCounterEl) quizCounterEl.textContent = `Domanda ${quizIndex + 1} di ${domande.length}`;
    if (quizProgressBarEl) quizProgressBarEl.style.width = ((quizIndex / domande.length) * 100) + "%";

    quizDomandaEl.textContent = d.testo;
    quizOpzioniEl.innerHTML = "";
    quizFeedbackEl.textContent = "";
    quizFeedbackEl.className = "quiz-feedback";
    if (quizNextEl) quizNextEl.style.display = "none";

    d.opzioni.forEach((opzione, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-opzione";
      btn.textContent = opzione;
      btn.setAttribute("data-index", i);

      btn.addEventListener("click", function () {
        if (quizRispostaData) return;
        quizRispostaData = true;

        const scelta = parseInt(btn.getAttribute("data-index"));
        const corretta = d.corretta;

        // Colora tutte le opzioni
        quizOpzioniEl.querySelectorAll(".quiz-opzione").forEach((b, bi) => {
          b.disabled = true;
          if (bi === corretta) b.classList.add("corretta");
          else if (bi === scelta && scelta !== corretta) b.classList.add("sbagliata");
        });

        if (scelta === corretta) {
          quizPunteggio++;
          quizFeedbackEl.textContent = "✅ " + d.spiegazione;
          quizFeedbackEl.classList.add("ok");
        } else {
          quizFeedbackEl.textContent = "❌ " + d.spiegazione;
          quizFeedbackEl.classList.add("no");
        }

        if (quizNextEl) {
          quizNextEl.style.display = "inline-block";
          quizNextEl.textContent = quizIndex < domande.length - 1 ? "Prossima domanda →" : "Vedi risultato →";
        }
      });

      quizOpzioniEl.appendChild(btn);
    });
  }

  function mostraRisultato() {
    if (!quizRisultatoEl) return;

    quizDomandaEl.style.display = "none";
    quizOpzioniEl.style.display = "none";
    quizFeedbackEl.style.display = "none";
    if (quizNextEl) quizNextEl.style.display = "none";
    if (quizCounterEl) quizCounterEl.style.display = "none";
    if (quizProgressBarEl) quizProgressBarEl.parentElement.style.display = "none";

    quizRisultatoEl.style.display = "block";

    const perc = Math.round((quizPunteggio / domande.length) * 100);

    if (quizScoreCircle) {
      quizScoreCircle.textContent = `${quizPunteggio}/${domande.length}`;
      quizScoreCircle.style.background = perc >= 80
        ? "linear-gradient(135deg, #1b7f5a, #14664a)"
        : perc >= 50
          ? "linear-gradient(135deg, #e8a020, #c47800)"
          : "linear-gradient(135deg, #c0392b, #922b21)";
    }

    if (quizRisultatoTitolo) {
      quizRisultatoTitolo.textContent = perc >= 80
        ? "Ottimo! Conosci bene la sostenibilità Granarolo 🎉"
        : perc >= 50
          ? "Buon risultato! Puoi migliorare ancora 📈"
          : "Rileggi le sezioni e riprova 💪";
    }

    if (quizRisultatoTesto) {
      quizRisultatoTesto.textContent = `Hai risposto correttamente a ${quizPunteggio} domande su ${domande.length} (${perc}%).`;
    }
  }

  if (quizNextEl) {
    quizNextEl.addEventListener("click", function () {
      quizIndex++;
      if (quizIndex < domande.length) {
        mostraDomanda();
      } else {
        mostraRisultato();
      }
    });
  }

  const quizResetEl = document.getElementById("quizReset");
  if (quizResetEl) {
    quizResetEl.addEventListener("click", function () {
      quizIndex = 0;
      quizPunteggio = 0;
      quizRispostaData = false;

      quizRisultatoEl.style.display = "none";
      quizDomandaEl.style.display = "";
      quizOpzioniEl.style.display = "";
      quizFeedbackEl.style.display = "";
      if (quizCounterEl) quizCounterEl.style.display = "";
      if (quizProgressBarEl) quizProgressBarEl.parentElement.style.display = "";

      mostraDomanda();
    });
  }

  // Avvia il quiz
  if (quizDomandaEl) mostraDomanda();

});
