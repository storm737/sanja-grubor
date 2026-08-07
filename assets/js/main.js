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
        "Telefon: " + (telefon || "—"),
        "",
        poruka
      ].join("\n");

      var adresa = form.getAttribute("data-mailto-form");
      window.location.href =
        "mailto:" + adresa +
        "?subject=" + encodeURIComponent("Upit sa sajta — " + (ime || "novi upit")) +
        "&body=" + encodeURIComponent(telo);

      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Otvara se vaš e-mail program sa pripremljenom porukom. Ostaje samo da je pošaljete.";
      }
    });
  }

  /* --- MailerLite forme (besplatni resursi, newsletter) ------------------
     Forma i dalje šalje pravi POST ka MailerLite-u (ništa se ne gubi), ali
     odgovor ide u skriveni iframe umesto u novi tab — posetilac na sajtu
     odmah vidi poruku umesto golog JSON teksta poput {"success":true}. */
  var mailForms = document.querySelectorAll(".mail-form");

  if (mailForms.length) {
    var mlCilj = document.createElement("iframe");
    mlCilj.name = "ml-cilj";
    mlCilj.setAttribute("aria-hidden", "true");
    mlCilj.tabIndex = -1;
    mlCilj.style.cssText = "position:absolute; width:1px; height:1px; opacity:0; pointer-events:none; border:0;";
    document.body.appendChild(mlCilj);

    Array.prototype.forEach.call(mailForms, function (f) {
      f.setAttribute("target", "ml-cilj");

      f.addEventListener("submit", function () {
        var tekst = f.getAttribute("data-uspeh") ||
          "Hvala na prijavi! Proverite inbox i potvrdite mejl.";
        var poruka = document.createElement("p");
        poruka.className = "mail-hvala";
        poruka.textContent = tekst;
        poruka.setAttribute("role", "status");
        f.replaceWith(poruka);
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

  /* --- Godina u podnožju ------------------------------------------------- */
  var year = document.querySelector("[data-year]");
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
