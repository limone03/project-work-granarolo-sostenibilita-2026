/* Barra di avanzamento durante lo scroll */
window.addEventListener("scroll", function () {
    const progressBar = document.getElementById("progressBar");

    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) return;

    const scrollPercent = (scrollTop / documentHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
});


/* Animazione degli elementi quando entrano nello schermo */
const elementiAnimati = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.15
});

elementiAnimati.forEach(function (elemento) {
    observer.observe(elemento);
});


/* Contatori animati nella sezione Numeri chiave */
const contatori = document.querySelectorAll(".counter");
let contatoriAvviati = false;

function animaContatori() {
    if (contatoriAvviati) return;

    const sezioneNumeri = document.getElementById("numeri");
    if (!sezioneNumeri) return;

    const posizione = sezioneNumeri.getBoundingClientRect();

    if (posizione.top < window.innerHeight && posizione.bottom > 0) {
        contatoriAvviati = true;

        contatori.forEach(function (contatore) {
            const valoreFinale = parseInt(contatore.getAttribute("data-target"));
            const prefisso = contatore.getAttribute("data-prefix") || "";
            const suffisso = contatore.getAttribute("data-suffix") || "";
            let valoreAttuale = 0;

            const durata = 1400;
            const incremento = valoreFinale / (durata / 20);

            const intervallo = setInterval(function () {
                valoreAttuale += incremento;

                if (valoreAttuale >= valoreFinale) {
                    valoreAttuale = valoreFinale;
                    clearInterval(intervallo);
                }

                contatore.textContent = prefisso + Math.floor(valoreAttuale).toLocaleString("it-IT") + suffisso;
            }, 20);
        });
    }
}

window.addEventListener("scroll", animaContatori);
window.addEventListener("load", animaContatori);


/* Pulsante torna su */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (!backToTop) return;

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});
