/* Mobilna navigacija, pojavljivanje sekcija i slanje kontakt forme. */

(function () {
  "use strict";

  /* --- Mobilni meni ----------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    var setMenu = function (open) {
      nav.setAttribute("data-open", String(open));
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", function () {
      setMenu(nav.getAttribute("data-open") !== "true");
    });

    // Klik na stavku menija zatvara meni — bitno za sidra na istoj stranici.
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) { setMenu(false); }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.getAttribute("data-open") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* --- Pojavljivanje pri skrolu ----------------------------------------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");

  var prikazi = function (el) { el.classList.add("is-in"); };

  if (reduced || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(targets, prikazi);
  } else {
    // Sve što je već u vidnom polju prikazuje se odmah — bez čekanja na observer.
    Array.prototype.forEach.call(targets, function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) { prikazi(el); }
    });

    // threshold 0: dovoljan je i piksel dodira. Sa većim pragom vrlo visok blok
    // (npr. zid utisaka) nikada ne bi dostigao prag na malom ekranu i ostao bi
    // trajno neviđen.
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          prikazi(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0 });

    Array.prototype.forEach.call(targets, function (el) { observer.observe(el); });

    // Poslednja brana: posle 4 sekunde sve je vidljivo, bez obzira na sve.
    window.setTimeout(function () {
      if (!document.querySelector(".reveal.is-in")) {
        document.documentElement.classList.add("no-anim");
      }
      Array.prototype.forEach.call(targets, prikazi);
    }, 4000);
  }

  /* --- Kontakt forma ----------------------------------------------------
     Sajt je statičan, pa forma otvara e-mail program sa popunjenom porukom.
     Za slanje sa servera vidi README (Formspree / Netlify Forms).            */
  var form = document.querySelector("[data-mailto-form]");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var ime = (data.get("ime") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var telefon = (data.get("telefon") || "").toString().trim();
      var poruka = (data.get("poruka") || "").toString().trim();

      var telo = [
        "Ime i prezime: " + ime,
        "E-mail: " + email,
        "Telefon: " + (telefon || "nije navedeno"),
        "",
        poruka
      ].join("\n");

      var adresa = form.getAttribute("data-mailto-form");
      window.location.href =
        "mailto:" + adresa +
        "?subject=" + encodeURIComponent("Upit sa sajta: " + (ime || "novi upit")) +
        "&body=" + encodeURIComponent(telo);

      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Otvara se vaš e-mail program sa pripremljenom porukom. Ostaje samo da je pošaljete.";
      }
    });
  }

  /* --- Zahtev za besplatni materijal -------------------------------------
     Dugme „Zatražite…" je mailto link (radi i bez JS-a). Kada JS radi, umesto
     toga otvara dijalog sa formom koja se šalje preko Netlify Forms (vidi
     data-netlify na formi u resursi.html); Netlify prosleđuje poruku na e-mail. */
  var dijalog = document.getElementById("zahtev-dialog");

  if (dijalog && typeof dijalog.showModal === "function") {
    var zForma = document.getElementById("zahtev-forma");
    var zStatus = zForma.querySelector("[data-status]");
    var zDugme = zForma.querySelector("button[type=submit]");
    var zPolja = zForma.querySelectorAll(".field, .form-note, [type=submit]");
    var zVodic = "";

    Array.prototype.forEach.call(document.querySelectorAll("[data-vodic]"), function (a) {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        zVodic = a.getAttribute("data-vodic");
        zForma.querySelector("[data-vodic-naziv]").textContent = zVodic;
        zForma.querySelector("[data-vodic-polje]").value = zVodic;
        zForma.querySelector("[data-subject-polje]").value = "Zahtev za materijal: " + zVodic;
        zStatus.textContent = "";
        zStatus.className = "zahtev-status";
        Array.prototype.forEach.call(zPolja, function (el) { el.style.display = ""; });
        zDugme.disabled = false;
        zDugme.textContent = "Pošaljite zahtev";
        dijalog.showModal();
      });
    });

    var porukeGreske = {
      ime: "Upišite vaše ime.",
      prezime: "Upišite vaše prezime.",
      email: "Upišite e-mail adresu na koju da pošaljem materijal."
    };
    Array.prototype.forEach.call(zForma.querySelectorAll("input[required]"), function (polje) {
      polje.addEventListener("invalid", function () {
        polje.setCustomValidity(
          polje.validity.valueMissing ? porukeGreske[polje.name] : "Upišite punu e-mail adresu, na primer ime@primer.com."
        );
      });
      polje.addEventListener("input", function () { polje.setCustomValidity(""); });
    });

    dijalog.querySelector("[data-zatvori]").addEventListener("click", function () { dijalog.close(); });
    dijalog.addEventListener("click", function (event) {
      if (event.target === dijalog) { dijalog.close(); }
    });

    zForma.addEventListener("submit", function (event) {
      event.preventDefault();
      zDugme.disabled = true;
      zDugme.textContent = "Šaljem…";
      zStatus.textContent = "";

      var ime = zForma.elements["ime"].value.trim();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(zForma)).toString()
      }).then(function (odgovor) {
        if (!odgovor.ok) { throw new Error("neuspeh"); }
      }).then(function () {
        Array.prototype.forEach.call(zPolja, function (el) { el.style.display = "none"; });
        zStatus.className = "zahtev-status zahtev-status--ok";
        zStatus.textContent = "Hvala, " + ime + "! Zahtev je poslat. Materijal „" + zVodic +
          "“ stiže na vašu e-mail adresu u roku od jednog do dva dana.";
        zForma.reset();
      }).catch(function () {
        zDugme.disabled = false;
        zDugme.textContent = "Pošaljite zahtev";
        zStatus.className = "zahtev-status zahtev-status--greska";
        zStatus.innerHTML = "Slanje nije uspelo. Pokušajte ponovo ili mi pišite na " +
          '<a href="mailto:sgterapeut@gmail.com?subject=' + encodeURIComponent("Zahtev za materijal: " + zVodic) +
          '">sgterapeut@gmail.com</a>.';
      });
    });
  }

  /* --- Zid utisaka: prikaži prvih N, ostalo na dugme --------------------
     Skraćivanje radi samo kada JS radi, pa su bez njega svi utisci vidljivi. */
  var wall = document.querySelector("[data-collapsible]");
  var moreBtn = document.querySelector("[data-more]");

  if (wall && moreBtn) {
    var limit = parseInt(wall.getAttribute("data-collapsible"), 10) || 6;
    var items = wall.children;
    var total = items.length;

    if (total > limit) {
      for (var i = limit; i < total; i++) { items[i].hidden = true; }
      moreBtn.hidden = false;
      moreBtn.textContent = "Prikažite sve utiske (" + total + ")";

      moreBtn.addEventListener("click", function () {
        for (var j = limit; j < total; j++) { items[j].hidden = false; }
        moreBtn.hidden = true;
        items[limit].scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      });
    }
  }

  /* --- Kartice Unutrašnjeg kompasa: dugme otvara galeriju, klik okreće --- */
  var galerija = document.querySelector("[data-galerija]");
  var galerijaBtn = document.querySelector("[data-galerija-dugme]");

  if (galerija && galerijaBtn) {
    galerija.hidden = true;
    galerijaBtn.hidden = false;

    galerijaBtn.addEventListener("click", function () {
      galerija.hidden = false;
      galerijaBtn.hidden = true;
      galerija.querySelector(".kartica").focus();
      galerija.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".kartica"), function (k) {
    k.addEventListener("click", function () {
      var okrenuta = k.getAttribute("aria-pressed") === "true";
      k.setAttribute("aria-pressed", String(!okrenuta));
    });
  });

  /* --- Prozor sa pozivom na istraživanje -----------------------------------
     Pojavljuje se po otvaranju sajta, a zatim povremeno (najviše 3 puta po
     poseti, ne češće nego na svakih 5 minuta), i na istoj stranici i pri
     prelasku na drugu. Ko klikne na upitnik, ne vidi ga više (localStorage).
     Ne prikazuje se na samoj stranici Istraživanje. */
  var ankLink = "https://forms.gle/MRETikuF9mKagfCY9";
  var ANK_RAZMAK = 5 * 60 * 1000;
  var ANK_NAJVISE = 3;

  var ankCitaj = function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  var ankPisi = function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} };
  var ankPopunjena = function () { try { return localStorage.getItem("anketa-popunjena") === "1"; } catch (e) { return false; } };

  var ankPrikazi = function () {
    if (ankPopunjena() || document.querySelector("dialog[open]")) { return; }

    ankPisi("anketa-puta", String((parseInt(ankCitaj("anketa-puta"), 10) || 0) + 1));
    ankPisi("anketa-vreme", String(Date.now()));

    var ank = document.createElement("dialog");
    ank.className = "anketa";
    ank.setAttribute("aria-labelledby", "anketa-naslov");
    ank.innerHTML =
      '<button class="anketa-zatvori" type="button" aria-label="Zatvori" data-ank-zatvori>&times;</button>' +
      '<img class="anketa-slika" src="assets/img/istrazivanje-foto.jpg" alt="" width="1024" height="1536">' +
      '<div class="anketa-telo">' +
        '<p class="kicker"><span class="facet"></span> <span>Istraživanje</span></p>' +
        '<h2 id="anketa-naslov">Učestvujte u istraživanju o partnerskim odnosima</h2>' +
        '<p>Vaša iskustva, mišljenja i stavovi su mi važni. Upitnik je anoniman, a učešće dobrovoljno.</p>' +
        '<div class="btn-row">' +
          '<a class="btn" href="' + ankLink + '" target="_blank" rel="noopener" data-ank-upitnik autofocus>Popunite upitnik</a>' +
          '<a class="btn btn--ghost" href="istrazivanje.html">Saznajte više</a>' +
        '</div>' +
        '<button class="anketa-nesada" type="button" data-ank-zatvori>Ne sada</button>' +
      '</div>';
    document.body.appendChild(ank);

    Array.prototype.forEach.call(ank.querySelectorAll("[data-ank-zatvori]"), function (b) {
      b.addEventListener("click", function () { ank.close(); });
    });
    ank.addEventListener("click", function (event) { if (event.target === ank) { ank.close(); } });
    ank.querySelector("[data-ank-upitnik]").addEventListener("click", function () {
      try { localStorage.setItem("anketa-popunjena", "1"); } catch (e) {}
      ank.close();
    });
    ank.addEventListener("close", function () {
      ank.remove();
      ankPlaniraj();
    });

    ank.showModal();
  };

  var ankPlaniraj = function () {
    if (ankPopunjena() || (parseInt(ankCitaj("anketa-puta"), 10) || 0) >= ANK_NAJVISE) { return; }
    var poslednji = parseInt(ankCitaj("anketa-vreme"), 10);
    var cekaj = poslednji ? Math.max(ANK_RAZMAK - (Date.now() - poslednji), 1500) : 1500;
    window.setTimeout(function () {
      if (document.querySelector("dialog[open]")) { window.setTimeout(ankPlaniraj, 30000); return; }
      ankPrikazi();
    }, cekaj);
  };

  if (!/istrazivanje(\.html)?\/?$/.test(location.pathname) && typeof HTMLDialogElement === "function") {
    ankPlaniraj();
  }

  /* --- Godina u podnožju ------------------------------------------------- */
  var year = document.querySelector("[data-year]");
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
