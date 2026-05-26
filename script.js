 JS
document.addEventListener("DOMContentLoaded", function () {
 
  /* =========================
     SPLASH LIQUID REVEAL
     ========================= */
  const splash = document.getElementById("splash");
  if (splash) {
    setTimeout(() => {
      splash.classList.add("hide");
      setTimeout(() => splash.remove(), 400);
    }, 1900);
  }
 
  /* =========================
     DARK MODE
     ========================= */
  const darkToggle = document.getElementById("darkToggle");
  if (darkToggle) {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const saved = localStorage.getItem("darkMode");
    if (saved === "1" || (saved === null && prefersDark)) {
      document.body.classList.add("dark");
      darkToggle.textContent = "☀️";
    } else {
      darkToggle.textContent = "🌙";
    }
    darkToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      darkToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("darkMode", isDark ? "1" : "0");
    });
  }
 
  /* =========================
     SIDEBAR (hamburger)
     ========================= */
  const menuToggle  = document.getElementById("menuToggle");
  const sideNav     = document.getElementById("sideNav");
  const menuClose   = document.getElementById("menuClose");
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
 
  /* =========================
     SCROLLSPY
     ========================= */
  (function () {
    const sideNavEl = document.getElementById("sideNav");
    if (!sideNavEl) return;
    const links = Array.from(sideNavEl.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;
    const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    if (!sections.length) return;
    let currentId = null;
    function setActive(id) {
      if (!id || currentId === id) return;
      currentId = id;
      links.forEach(a => a.classList.remove("spy-active"));
      const activeLink = sideNavEl.querySelector(`a[href="#${CSS.escape(id)}"]`);
      if (activeLink) activeLink.classList.add("spy-active");
    }
    if (!("IntersectionObserver" in window)) {
      window.addEventListener("scroll", () => {
        const y = window.scrollY + 140;
        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i].offsetTop <= y) { setActive(sections[i].id); break; }
        }
      }, { passive: true });
      setActive(sections[0].id);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target && visible.target.id) setActive(visible.target.id);
    }, { root: null, threshold: [0.2,0.35,0.5,0.65], rootMargin: "-10% 0px -55% 0px" });
    sections.forEach(sec => observer.observe(sec));
    setActive(sections[0].id);
  })();
 
  /* =========================
     PROGRESS BAR + BACK TO TOP
     ========================= */
  const progressBar = document.getElementById("progressBar");
  const backToTop   = document.getElementById("backToTop");
  function aggiornaScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && dh > 0) progressBar.style.width = ((st / dh) * 100) + "%";
    if (backToTop) {
      if (st > 250) backToTop.classList.add("show");
      else          backToTop.classList.remove("show");
    }
  }
  window.addEventListener("scroll", aggiornaScroll, { passive: true });
  window.addEventListener("load", aggiornaScroll);
  aggiornaScroll();
 
  /* =========================
     ANIMATE ON SCROLL
     ========================= */
  const elementiAnimati = document.querySelectorAll(".animate-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });
    elementiAnimati.forEach(el => observer.observe(el));
  } else {
    elementiAnimati.forEach(el => el.classList.add("visible"));
  }
 
  /* =========================
     CARD AZIONI — stagger entrata
     ========================= */
  (function () {
    const sezioneAzioni = document.getElementById("azioni");
    if (!sezioneAzioni) return;
    if (!("IntersectionObserver" in window)) {
      sezioneAzioni.classList.add("cards-visible");
      return;
    }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sezioneAzioni.classList.add("cards-visible");
          obs.disconnect();
        }
      });
    }, { threshold: 0.12 });
    obs.observe(sezioneAzioni);
  })();
 
  /* =========================
     CONTATORI ANIMATI
     ========================= */
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
      if (valoreAttuale >= valoreFinale) { valoreAttuale = valoreFinale; clearInterval(contatore.timer); }
      contatore.textContent = prefisso + Math.floor(valoreAttuale).toLocaleString("it-IT") + suffisso;
    }, 20);
  }
 
  document.querySelectorAll(".numeri-grid article").forEach(function (card) {
    const contatore = card.querySelector(".counter");
    if (!contatore) return;
    card.addEventListener("mouseenter", () => animaContatore(contatore));
    card.addEventListener("click",      () => animaContatore(contatore));
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
 
  /* =========================
     MINI GRAFICI
     ========================= */
  (function () {
    const chartsBox = document.getElementById("miniCharts");
    const closeBtn  = document.getElementById("closeCharts");
    const titleEl   = document.getElementById("chartTitle");
    if (!chartsBox) return;
    const rows  = Array.from(chartsBox.querySelectorAll(".bar-row"));
    const fills = rows.map(r => r.querySelector(".bar-fill"));
 
    function resetBars() { fills.forEach(f => { if (f) f.style.width = "0%"; }); }
    function runBars()   { rows.forEach((row, i) => { const pct = Math.max(0, Math.min(100, parseInt(row.getAttribute("data-pct"), 10) || 0)); if (fills[i]) fills[i].style.width = pct + "%"; }); }
 
    function openCharts(label) {
      chartsBox.classList.add("show");
      chartsBox.setAttribute("aria-hidden", "false");
      if (titleEl) titleEl.textContent = label;
      resetBars();
      requestAnimationFrame(() => runBars());
    }
    function closeCharts() {
      chartsBox.classList.remove("show");
      chartsBox.setAttribute("aria-hidden", "true");
    }
    document.querySelectorAll(".show-chart").forEach(el => {
      el.addEventListener("click", () => {
        const t = el.getAttribute("data-chart");
        if      (t === "co2")    openCharts("Grafico: -60.000 t CO₂");
        else if (t === "target") openCharts("Grafico: -30% entro 2030");
        else if (t === "farms")  openCharts("Grafico: 80+ allevamenti");
        else                     openCharts("Grafico");
        chartsBox.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    if (closeBtn) closeBtn.addEventListener("click", closeCharts);
  })();
 
  /* =========================
     TOOLTIP (azioni)
     ========================= */
  document.querySelectorAll(".azione-card[data-tooltip]").forEach(card => {
    const tooltip = card.querySelector(".card-tooltip");
    if (!tooltip) return;
    tooltip.textContent = card.getAttribute("data-tooltip");
    card.addEventListener("mouseenter", () => tooltip.classList.add("visible"));
    card.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
    card.addEventListener("focus",      () => tooltip.classList.add("visible"));
    card.addEventListener("blur",       () => tooltip.classList.remove("visible"));
  });
 
  /* =========================
     TIMELINE
     ========================= */
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach(item => {
    item.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      timelineItems.forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
  if (timelineItems.length > 0) timelineItems[0].classList.add("open");
 
  /* =========================
     QUIZ
     ========================= */
  const domande = [
    { testo: "Quante tonnellate di CO₂ equivalente l'anno si stima di ridurre grazie al progetto biometano?", opzioni: ["20.000 t","60.000 t","100.000 t","40.000 t"], corretta: 1, spiegazione: "Il progetto biometano punta a una riduzione stimata di 60.000 t di CO₂ eq/anno." },
    { testo: "Qual è l'obiettivo di riduzione delle emissioni lungo la filiera entro il 2030?", opzioni: ["-10%","-50%","-30%","-20%"], corretta: 2, spiegazione: "L'obiettivo fissato è una riduzione del 30% delle emissioni lungo tutta la filiera entro il 2030." },
    { testo: "Quanti allevamenti sono monitorati con attività di misurazione continua?", opzioni: ["Oltre 20","Oltre 50","Oltre 80","Oltre 120"], corretta: 2, spiegazione: "Più di 80 allevamenti partner sono coinvolti nel programma di monitoraggio." },
    { testo: "Quale tra questi è uno dei pilastri della strategia di sostenibilità?", opzioni: ["Packaging biodegradabile","Pratiche agronomiche","Energia solare negli uffici","Riduzione del personale"], corretta: 1, spiegazione: "Le pratiche agronomiche rappresentano uno dei pilastri strategici." },
    { testo: "Cosa caratterizza l'approccio alla sostenibilità?", opzioni: ["Interventi solo sul packaging","Certificazioni senza obiettivi misurabili","Azioni concrete a monte della filiera, misurabili e verificabili","Comunicazione senza dati"], corretta: 2, spiegazione: "Approccio basato su misurazioni concrete e interventi diretti nella filiera a monte." }
  ];
 
  let quizIndex = 0, quizPunteggio = 0, quizRispostaData = false;
  const quizDomandaEl     = document.getElementById("quizDomanda");
  const quizOpzioniEl     = document.getElementById("quizOpzioni");
  const quizFeedbackEl    = document.getElementById("quizFeedback");
  const quizNextEl        = document.getElementById("quizNext");
  const quizRisultatoEl   = document.getElementById("quizRisultato");
  const quizCounterEl     = document.getElementById("quizCounter");
  const quizProgressBarEl = document.getElementById("quizProgressBar");
  const quizScoreCircle   = document.getElementById("quizScoreCircle");
  const quizRisultatoTitolo = document.getElementById("quizRisultatoTitolo");
  const quizRisultatoTesto  = document.getElementById("quizRisultatoTesto");
  const quizResetEl         = document.getElementById("quizReset");
 
  function mostraDomanda() {
    if (!quizDomandaEl || !quizOpzioniEl) return;
    quizRispostaData = false;
    const d = domande[quizIndex];
    if (quizCounterEl)     quizCounterEl.textContent = `Domanda ${quizIndex + 1} di ${domande.length}`;
    if (quizProgressBarEl) quizProgressBarEl.style.width = ((quizIndex / domande.length) * 100) + "%";
    quizDomandaEl.textContent = d.testo;
    quizOpzioniEl.innerHTML   = "";
    if (quizFeedbackEl) { quizFeedbackEl.textContent = ""; quizFeedbackEl.className = "quiz-feedback"; }
    if (quizNextEl)     quizNextEl.style.display = "none";
    if (quizRisultatoEl) quizRisultatoEl.style.display = "none";
    d.opzioni.forEach((opzione, i) => {
      const btn = document.createElement("button");
      btn.className   = "quiz-opzione";
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
        if (quizFeedbackEl) { quizFeedbackEl.textContent = (ok ? "Corretto! " : "No. ") + d.spiegazione; quizFeedbackEl.classList.add(ok ? "ok" : "no"); }
        if (quizNextEl) quizNextEl.style.display = "inline-block";
      });
      quizOpzioniEl.appendChild(btn);
    });
  }
 
  function mostraRisultato() {
    if (quizRisultatoEl)    quizRisultatoEl.style.display = "block";
    if (quizNextEl)         quizNextEl.style.display = "none";
    if (quizDomandaEl)      quizDomandaEl.textContent = "Quiz completato";
    if (quizOpzioniEl)      quizOpzioniEl.innerHTML   = "";
    if (quizScoreCircle)    quizScoreCircle.textContent = `${quizPunteggio}/${domande.length}`;
    if (quizRisultatoTitolo) quizRisultatoTitolo.textContent = quizPunteggio === domande.length ? "Perfetto!" : quizPunteggio >= Math.ceil(domande.length * 0.7) ? "Ottimo!" : quizPunteggio >= Math.ceil(domande.length * 0.4) ? "Buono!" : "Da ripassare";
    if (quizRisultatoTesto)  quizRisultatoTesto.textContent = `Hai totalizzato ${quizPunteggio} risposte corrette su ${domande.length}.`;
    if (quizProgressBarEl)  quizProgressBarEl.style.width = "100%";
  }
 
  if (quizNextEl)  quizNextEl.addEventListener("click", function () { quizIndex++; if (quizIndex >= domande.length) mostraRisultato(); else mostraDomanda(); });
  if (quizResetEl) quizResetEl.addEventListener("click", function () { quizIndex = 0; quizPunteggio = 0; quizRispostaData = false; mostraDomanda(); });
  if (quizDomandaEl && quizOpzioniEl) mostraDomanda();
 
});
