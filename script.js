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
            if (scrollTop > 250) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
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
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, {
            threshold: 0.12
        });

        elementiAnimati.forEach(function (elemento) {
            observer.observe(elemento);
        });
    } else {
        elementiAnimati.forEach(function (elemento) {
            elemento.classList.add("visible");
        });
    }


    /* Funzione per animare un singolo contatore */
    function animaContatore(contatore) {
        const valoreFinale = parseInt(contatore.getAttribute("data-target"));
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


    /* Numeri animati al passaggio del mouse, click o tap */
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

});
