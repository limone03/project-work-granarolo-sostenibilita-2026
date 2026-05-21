document.addEventListener("DOMContentLoaded", function () {

  /* =============================================
     DARK MODE (sincronizzata con index)
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

    elementiAnimati.forEach(el => observer.observe(el));
  } else {
    elementiAnimati.forEach(el => el.classList.add("visible"));
  }

  /* =============================================
     DATI AZIONI
     ============================================= */
  const ordineAzioni = ["azione1", "azione2", "azione3", "azione4", "azione5"];

  const contenuti = {
    azione1: {
      titolo: "Benessere animale",
      sottotitolo: "Qualità della filiera e attenzione alla gestione in allevamento",
      img: "img/azione1_benessere.jpg",
      alt: "Benessere animale in allevamento",
      testo:
        "Il benessere animale viene considerato un punto centrale nella filiera lattiero-casearia, perché incide sia sulla qualità del latte sia sull'equilibrio complessivo dell'allevamento. L'azione riguarda il miglioramento delle condizioni di allevamento e una gestione più attenta dei farmaci veterinari, con l'obiettivo di ridurne l'uso quando possibile e rendere più efficace l'intervento terapeutico. Un approccio del genere risulta coerente con le attività "a monte" tipiche del settore primario: si lavora direttamente in allevamento, dove nasce gran parte dell'impatto e dove si possono ottenere miglioramenti concreti e misurabili nel tempo.",
      dato: "Punto chiave: intervento diretto in allevamento, con effetti su qualità e sostenibilità di filiera.",
      emoji: "🐄"
    },
    azione2: {
      titolo: "Nutrizione animale sostenibile",
      sottotitolo: "Efficienza e riduzione dell'impatto attraverso l'alimentazione",
      img: "img/azione2_nutrizione.jpg",
      alt: "Nutrizione e alimentazione animale",
      testo:
        "La nutrizione animale è una leva importante perché influenza l'efficienza produttiva e, di conseguenza, l'impatto ambientale della produzione di latte. Intervenire sull'alimentazione significa lavorare su una scelta operativa, quotidiana e molto concreta: cosa viene somministrato agli animali e con quale obiettivo. In una filiera lattiero-casearia, questa azione permette di ottimizzare i consumi e ridurre sprechi, mantenendo allo stesso tempo la qualità della produzione. Anche in questo caso il collegamento al settore primario è diretto, perché l'intervento si colloca nella fase di allevamento e nella gestione a monte della filiera.",
      dato: "Punto chiave: la sostenibilità passa anche da scelte tecniche sull'alimentazione in allevamento.",
      emoji: "🌾"
    },
    azione3: {
      titolo: "Pratiche agronomiche",
      sottotitolo: "Gestione del suolo e pratiche agricole più efficienti",
      img: "img/azione3_agronomia.jpg",
      alt: "Pratiche agronomiche e gestione del suolo",
      testo:
        "Le pratiche agronomiche incidono su suolo, risorse naturali e stabilità produttiva. Ottimizzarle significa agire sulla base agricola della filiera, legata ad esempio alle coltivazioni connesse alla nutrizione animale. Un'attenzione maggiore alle pratiche agricole può contribuire a ridurre l'impatto complessivo e, in prospettiva, favorire processi collegati alla cattura della CO₂. Questo tema rafforza l'inquadramento nel settore primario perché riguarda attività agricole e gestione del territorio, elementi essenziali per la sostenibilità di una filiera lattiero-casearia.",
      dato: "Punto chiave: la sostenibilità di filiera parte anche dal suolo e dalle pratiche agricole.",
      emoji: "🌱"
    },
    azione4: {
      titolo: "Riduzione dell'impatto della produzione di latte",
      sottotitolo: "Misurazione e interventi mirati in allevamento",
      img: "img/azione4_monitoraggio.jpg",
      alt: "Monitoraggio e misurazione in allevamento",
      testo:
        "Ridurre l'impatto ambientale della produzione di latte richiede un approccio basato sulla misurazione: prima si osserva e si analizza, poi si interviene dove serve davvero. L'azione si concentra sul monitoraggio negli allevamenti e su interventi mirati per ridurre emissioni e consumi legati alla produzione. Questo tipo di impostazione è importante perché rende la sostenibilità controllabile e non solo dichiarata: i miglioramenti vengono collegati a dati, indicatori e scelte operative. Anche qui il collegamento con il settore primario è evidente, perché il lavoro si svolge direttamente nella fase produttiva 'a monte'.",
      dato: "Punto chiave: misurare l'impatto permette di intervenire in modo mirato e verificabile.",
      emoji: "📊"
    },
    azione5: {
      titolo: "Progetto biometano",
      sottotitolo: "Energia rinnovabile e valorizzazione delle risorse di filiera",
      img: "img/azione5_biometano.jpg",
      alt: "Impianto biometano e energia rinnovabile",
      testo:
        "Il progetto biometano rappresenta un esempio concreto di sostenibilità applicata alla filiera, perché collega la componente agricola e zootecnica alla produzione di energia rinnovabile. L'obiettivo è ridurre le emissioni valorizzando risorse e sottoprodotti, con una logica vicina all'economia circolare. Questa iniziativa è efficace anche dal punto di vista comunicativo, perché consente di associare l'azione a un beneficio misurabile. In una filiera lattiero-casearia, l'integrazione tra gestione delle risorse e produzione energetica rafforza l'idea di sostenibilità come scelta operativa e non solo teorica.",
      dato: "Punto chiave: economia circolare di filiera, con benefici ambientali misurabili.",
      emoji: "♻️"
    }
  };

  /* =============================================
     LETTURA PARAMETRO ?id=
     ============================================= */
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const data = contenuti[id];

  const titolo = document.getElementById("titoloAzione");
  const sottotitolo = document.getElementById("sottotitoloAzione");
  const h2 = document.getElementById("h2Azione");
  const testo = document.getElementById("testoAzione");
  const dato = document.getElementById("datoAzione");
  const img = document.getElementById("imgAzione");

  if (!data) {
    document.title = "Azione non trovata";
    if (titolo) titolo.textContent = "Azione non trovata";
    if (sottotitolo) sottotitolo.textContent = "Torna alla pagina principale e riprova.";
    if (h2) h2.textContent = "";
    if (testo) testo.textContent = "";
    if (dato) dato.textContent = "";
    if (img) img.style.display = "none";
    return;
  }

  /* Popola la pagina */
  document.title = data.titolo + " – Dettaglio";
  if (titolo) titolo.textContent = data.titolo;
  if (sottotitolo) sottotitolo.textContent = data.sottotitolo;
  if (h2) h2.textContent = data.titolo;
  if (testo) testo.textContent = data.testo;
  if (dato) dato.textContent = data.dato;
  if (img) { img.src = data.img; img.alt = data.alt; }

  /* =============================================
     TEMPO DI LETTURA STIMATO
     ============================================= */
  const readingTimeEl = document.getElementById("readingTime");
  if (readingTimeEl && data.testo) {
    const parole = data.testo.trim().split(/\s+/).length;
    const minuti = Math.ceil(parole / 180); // media lettura 180 parole/min
    readingTimeEl.textContent = `⏱ Tempo di lettura stimato: ${minuti} minuto${minuti > 1 ? "i" : ""}`;
  }

  /* =============================================
     NAVIGAZIONE PREV / NEXT
     ============================================= */
  const indiceCorrente = ordineAzioni.indexOf(id);
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const navDot = document.getElementById("azioneNavDot");

  // Indicatore posizione (es: ● ○ ○ ○ ○)
  if (navDot) {
    navDot.innerHTML = ordineAzioni.map((_, i) =>
      `<span class="nav-dot${i === indiceCorrente ? " nav-dot--active" : ""}"></span>`
    ).join("");
  }

  if (btnPrev) {
    if (indiceCorrente > 0) {
      const prevId = ordineAzioni[indiceCorrente - 1];
      btnPrev.href = `azione.html?id=${prevId}`;
      btnPrev.textContent = `← ${contenuti[prevId].titolo}`;
    } else {
      btnPrev.style.visibility = "hidden";
    }
  }

  if (btnNext) {
    if (indiceCorrente < ordineAzioni.length - 1) {
      const nextId = ordineAzioni[indiceCorrente + 1];
      btnNext.href = `azione.html?id=${nextId}`;
      btnNext.textContent = `${contenuti[nextId].titolo} →`;
    } else {
      btnNext.style.visibility = "hidden";
    }
  }

  /* =============================================
     CARD AZIONI CORRELATE (le altre 4)
     ============================================= */
  const correlateGrid = document.getElementById("correlateGrid");
  if (correlateGrid) {
    ordineAzioni
      .filter(k => k !== id)
      .forEach(k => {
        const d = contenuti[k];
        const num = k.replace("azione", "").padStart(2, "0");

        const card = document.createElement("a");
        card.className = "correlata-card";
        card.href = `azione.html?id=${k}`;
        card.innerHTML = `
          <span class="card-number">${num}</span>
          <span class="correlata-emoji">${d.emoji}</span>
          <strong>${d.titolo}</strong>
        `;
        correlateGrid.appendChild(card);
      });
  }

});
