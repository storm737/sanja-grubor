# Sajt — Sanja Grubor, psiholog i psihoterapeut

Statičan sajt: čist HTML, CSS i malo JavaScripta. Nema build koraka, nema zavisnosti.
Prekopirajte ceo folder na hosting i sajt radi.

Za pregled na svom računaru pokrenite lokalni server iz foldera sajta:

```
py -m http.server 5178
```

pa otvorite <http://localhost:5178>. Može i dvoklik na `index.html`, ali kroz
server je vernije — tako se ponaša i na pravom hostingu.

## Stranice

| Fajl | Stranica |
|---|---|
| `index.html` | Početna (svih 10 sekcija iz materijala) |
| `o-meni.html` | O meni — Umetnost života |
| `kako-vam-mogu-pomoci.html` | Oblici podrške |
| `unutrasnji-kompas.html` | Unutrašnji kompas |
| `blog.html` | Blog — spisak tekstova |
| `blog-da-li-smo-normalni.html` | Tekst: Da li smo normalni? |
| `blog-psihologija-nauka-psihoterapija-umetnost.html` | Tekst: Psihologija je nauka, psihoterapija je umetnost |
| `blog-psihoterapija-mesto-sretanja.html` | Tekst: Psihoterapija je mesto sretanja |
| `resursi.html` | Besplatni resursi |
| `utisci.html` | Utisci klijenata (14 utisaka) |
| `kontakt.html` | Kontakt |
| `politika-privatnosti.html` | Politika privatnosti |

## Šta treba dodati pre objave

Sva mesta u kodu su označena komentarom `<!-- ZAMENITI: ... -->`.

1. **Datumi objave na blogu.** Tekstovi trenutno nemaju datum — umesto njega
   stoji kratka oznaka teme. Ako želite datume, dodajte ih u `kicker` na
   `blog.html` i na vrhu svake `blog-*.html` stranice.
2. **Besplatni resursi — gotovo, samo aktivirati.** Svih 6 vodiča ima karticu
   sa tačnim naslovom, brojem strana i opisom pročitanim iz stvarnog PDF-a:
   Vision Board, Kako govoriti bez gubitka sebe, 5 jezika ljubavi, Zašto
   ostajemo tamo gde nas boli (toksični odnosi), Visoka senzitivnost, Zdrava
   empatija. Svaka kartica ima svoju formu — treba samo upisati adresu iz
   MailerLite-a (vidi „Preuzimanje uz e-mail i newsletter" ispod).

   Sami PDF-ovi su u `assets/05.08/Besplatni resursi/` — uploadujte ih u
   MailerLite (ne na sajt, vidi objašnjenje zašto ispod) i povežite sa
   odgovarajućom formom kroz automatizaciju.

   **Napomena:** u PDF-u „Kako govoriti bez gubitka sebe“, strana 6, nalazi se
   vaša interna beleška „BONUS: MATERIJAL ZA INSTAGRAM PROMOCIJU“ sa predlogom
   DM odgovora. Verovatno ne želite da to vide ljudi koji preuzmu vodič —
   uklonite tu stranicu iz PDF-a pre nego što ga uploadujete u MailerLite.
3. **Unutrašnji kompas.** Dopunite broj kartica, format, cenu i način naručivanja.
   Naslovnica seta je već postavljena.
4. **Politika privatnosti.** Radna verzija — pročitajte je sa pravnikom, unesite
   datum objave i uklonite napomenu na vrhu stranice.

## Slike

Sve slike su postavljene. Originali stoje u folderu `slikezaizradu/` i nisu
potrebni sajtu — možete ih zadržati kao arhivu ili obrisati.

| Fajl u `assets/img/` | Šta je | Gde se vidi |
|---|---|---|
| `logo-pun.png` | ceo logo, providna pozadina | Početna — hero |
| `sanja-grubor.jpg` | papirno srce, mural | Početna — „Kratko o meni" |
| `sanja-grubor-2.jpg` | roze sako, laptop | Kako vam mogu pomoći |
| `sanja-grubor-3.jpg` | čitanje knjige, mural | O meni |
| `sanja-grubor-4.jpg` | mali sto sa svećom, mural | Blog |
| `unutrasnji-kompas.jpg` | naslovnica seta kartica | Unutrašnji kompas |
| `kartice/*.jpg` | 8 kartica, lice i naličje | Unutrašnji kompas — galerija |
| `blog-*.jpg` | ilustracije iz tekstova | blog stranice |
| `kompas.svg` | ruža vetrova, vektor | vodeni žig na stranici Kompas |
| `ig-1.jpg` … `ig-6.jpg` | šest kvadratnih tila | Početna — Instagram |
| `logo-sg.png` | roze SG monogram, providna pozadina | zaglavlje i podnožje |
| `favicon.png` | logo, 64 × 64 | kartica pregledača |

**Logo u herou treba u većoj rezoluciji.** Original koji sam dobio je 500 × 500 px,
a u herou se na računaru prikazuje na oko 466 px. Na ekranima sa dvostrukom
gustinom piksela (svi noviji telefoni i Mac računari) biće blago mutan.
Ako imate logo u vektoru (SVG ili AI) ili bar 1500 px, pošaljite ga — zamena je
jedan fajl. Belu pozadinu sam uklonio programski, pa vektor ne bi tražio ni to.

Portreti se prikazuju u isečenom fasetnom okviru. Ako menjate neku fotografiju,
neka lice bude bliže sredini kadra i neka slika bude najmanje 900 px po kraćoj
strani. Naslovnica Unutrašnjeg kompasa je izuzetak — prikazuje se cela, bez
isecanja (klasa `portrait--fit`).

Fotografije su smanjene i prekodirane za veb (JPEG, kvalitet 84). Cela mapa slika
je oko 1,2 MB, a Početna učitava oko 670 KB, pri čemu se Instagram slike
učitavaju tek kada se doskroluje do njih.

## Utisci klijenata

Objavljeno je svih 14 utisaka. Prikazuje se prvih šest, a dugme „Prikažite sve
utiske (14)" otvara ostatak. Bez JavaScripta prikazuju se svi odjednom.
Broj se menja u `utisci.html`, atributom `data-collapsible="6"`.

Utisci su preneti verno, uz ispravku očiglednih slovnih grešaka i vraćanje naših
slova tamo gde su izostala. **Ništa nije preformulisano.** Spisak izmena, da
možete vratiti bilo koju:

| Autor | Izmena |
|---|---|
| J. E. | „duguhem" → „dugujem"; dodata tačka posle „nisam mogla"; **„ko sam ista koliko vredim" → „ko sam i koliko vredim"** — original je nejasan, proverite |
| A. B. | „stučnim" → „stručnim"; „razgovorm" → „razgovorom"; „bitinije" → „bitnije"; „ocjenivala" → „ocjenjivala" |
| V. G. | vraćena naša slova (tekst je bio bez njih); dodata interpunkcija |
| N. V. | ćirilično „і" zamenjeno latiničnim „i" (bilo je pomešano pismo) |
| R. G. | vraćena naša slova; „pra svega" → „pre svega"; „stavranju" → „stvaranju" |
| I. Š. | „osjecala" → „osjećala"; „izvuce" → „izvuče"; „iz vasi" → „iz vas i"; „larše" → „lakše" |
| V. D. | ostavljeno na ćirilici; „опствени" → „сопствени" |
| A. O. | vraćena naša slova; „odredjene" → „određene" |
| M. J. B. | „podrska" → „podrška"; razmak posle zareza |
| M. V. | „jođ jednom" → „još jednom"; „donjela" → „donijela"; dodati zarezi |
| Z. V. | dodata tačka posle „rešavanje" |

Ijekavica i lični stil svakog autora su zadržani. Utisci su potpisani samo
inicijalima; objavljujte ih uz saglasnost osoba koje su ih napisale.

## Tekst koji nije vaš

Sav tekst na sajtu prepisan je iz vašeg materijala, osim na sledećim mestima,
gde sam napisao predlog jer materijal to nije pokrivao. Pročitajte ih i
prepravite ako ne odgovaraju vašoj praksi — označeni su komentarom `PROVERITI`:

- **Vreme odgovora** na Početnoj i na Kontaktu („u najkraćem mogućem roku").
- **Napomena za hitne slučajeve** na Kontaktu (broj 194).
- **Kratki opisi kartica** na Početnoj i na „Kako vam mogu pomoći" — sastavljeni
  su od vaših formulacija, osim opisa za Profesionalnu orijentaciju.
- **Politika privatnosti** u celini (vidi tačku 5 gore).
- Uvodne rečenice na stranicama „Besplatni resursi", „Unutrašnji kompas"
  i „Utisci", kao i blok „Imate temu o kojoj biste voleli da pišem?" na Blogu.

## Kartice Unutrašnjeg kompasa

Na stranici Unutrašnji kompas dugme „Pogledajte kako izgledaju“ otvara galeriju
svih osam kartica. Klik na karticu je okreće i pokazuje pitanje sa naličja —
isto kao u stvarnom setu. Radi i tastaturom (Tab pa Enter), a bez JavaScripta
galerija je odmah otvorena i vide se lica kartica.

Slike su u `assets/img/kartice/`, po dve po temi: `-lice.jpg` i `-nalicje.jpg`.
Originali koje ste poslali stoje u `assets/05.08/Kartice/`.

Parovi su: jasnoća, pravac, oslonac, granice, mi, moj glas, šansa, smirivanje.

## Preuzimanje uz e-mail i newsletter

**Zašto ovo ne može samo sajt.** Sajt je statičan — nema server iza sebe, pa ne
može ni da zapamti e-mail adresu ni da pošalje poštu. Za to je potreban servis.

**I jedna zamka koju treba znati.** Ako PDF stoji na sajtu, na primer na adresi
`.../assets/preuzimanja/vision-board.pdf`, svako ko dođe do te adrese skine ga
bez ostavljanja mejla — dovoljno je da neko podeli link. Zato **PDF-ove ne treba
stavljati na sajt.** Uploadujete ih u servis, a servis ih šalje na mejl tek kada
se osoba prijavi. Tako uslov zaista važi.

### Kako se to postavlja (predlog: MailerLite)

MailerLite je besplatan do 1.000 pretplatnika i ima gotovu funkciju za baš ovo.

1. Otvorite nalog na **mailerlite.com** i potvrdite svoju e-mail adresu (na
   Sanjinu adresu, ne na adresu osobe koja pomaže oko sajta).
2. Napravite po jednu grupu pretplatnika za svaki od 6 vodiča — npr. „Vision
   Board“, „Kako govoriti bez gubitka sebe“, „5 jezika ljubavi“, „Toksični
   odnosi“, „Visoka senzitivnost“, „Zdrava empatija“.
3. Za svaki materijal napravite **formu** (*Forms → Embedded form*). MailerLite
   vam da adresu na koju se forma šalje — nešto poput
   `https://assets.mailerlite.com/jsonp/123456/forms/789/subscribe`.
4. U `resursi.html` pronađite svih 6 mesta sa `action="ZAMENITI-ADRESOM-FORME"`
   (po jedno za svaku karticu) i upišite odgovarajuću adresu. Isto polje postoji
   i na Početnoj, za opštu prijavu na newsletter.
5. Uploadujte PDF u MailerLite (*File manager*) i napravite automatizaciju:
   *Automation → When subscriber joins a group → Send email* sa linkom ka PDF-u.
6. Uključite **dvostruku potvrdu** (*double opt-in*). Time osoba potvrđuje adresu
   klikom u mejlu — to je i dokaz pristanka koji traži zakon.

Alternative koje rade isto: **Brevo** (bivši Sendinblue, besplatno 300 mejlova
dnevno) i **ConvertKit**. Postupak je isti, menjaju se samo nazivi ekrana.

### Ako želite da preskočite servis

Najjednostavnija varijanta bez ijednog naloga: PDF-ove stavite u
`assets/preuzimanja/` i linkujte ih direktno. Tada nema uslova e-mail adrese,
ali ni sistema koji treba održavati. Uvek se može dodati kasnije — raspored
stranice je isti.

### Pravni deo

U politici privatnosti već stoji odeljak o newsletteru. Dopunite ga nazivom
servisa koji izaberete (označeno komentarom `ZAMENITI`) — po Zakonu o zaštiti
podataka o ličnosti treba navesti kome se podaci prosleđuju, a MailerLite je
obrađivač sa serverima van Srbije.

## Kontakt forma

Statičan sajt ne može sam da šalje mejlove, pa forma otvara e-mail program
korisnika sa pripremljenom porukom (`assets/js/main.js`).

Ako želite da poruke stižu direktno u inbox, bez otvaranja e-mail programa,
najlakše je preko besplatnog servisa:

- **Formspree** — registrujete se, dobijete adresu i u HTML-u zamenite
  `<form data-mailto-form="...">` sa `<form action="https://formspree.io/f/VAS_ID" method="POST">`,
  pa iz `main.js` obrišete blok „Kontakt forma".
- **Netlify Forms** — ako sajt hostujete na Netlifyju, dovoljno je dodati
  `netlify` atribut na `<form>`.

## Instagram feed

Sekcija sada prikazuje šest statičnih slika koje vodite ka profilu. Za automatski
feed poslednjih objava koristi se servis tipa **Behold**, **Elfsight** ili
**SnapWidget** — dobijete kod koji zalepite umesto `<ul class="ig-grid">`.

## Napomene o sadržaju

- U materijalu su se pojavile dve verzije e-mail adrese: `sgtetapeut@gmail.com`
  i `sgterapeut@gmail.com`. Svuda je upisana druga (`sgterapeut@`) — proverite
  da li je ispravna.
- Telefon je svuda upisan kao `060/390-9501`, a `tel:` linkovi vode na
  `+3810603909501`.
- LinkedIn nije nigde dodat, kako je i navedeno u materijalu.

## Tehničke odluke

- **Tipografija:** Newsreader (naslovi) + Mulish (tekst), sa Google Fonts.
  Oba pisma podržavaju srpsku latinicu (č, ć, š, ž, đ). Ranije je bio Fraunces,
  ali on ima uključenu „WONK" osu koja namerno iskrivljuje slova j i g —
  Newsreader ima mirno, klasično j.
- **Pozadine:** `body::before` je fiksni sloj sa tri mekana roze prelaza i stoji
  iza sadržaja na svakoj stranici, pa nijedna sekcija ne deluje prazno bela.
  Sekcije `--blush` i `--sage` su roze trake sa blagim prelivom; klasa `--sage`
  je zadržala naziv iz ranije zelene verzije, ali je sada tamnija roze.
- **Hero na Početnoj:** fotografija `hero-bg.jpg` stoji u sloju `.hero::before`
  na 42% providnosti, a preko nje ide roze veo (`.hero::after`) koji drži
  čitljivost teksta. Providnost se menja na jednom mestu u CSS-u.
- **Kompas u pozadini:** `assets/img/kompas.svg` je ručno nacrtana ruža vetrova
  u brend roze, po uzoru na naslovnicu seta. Koristi se kao vodeni žig na
  stranici Unutrašnji kompas — u zaglavlju (10% vidljivosti) i u donjoj roze
  traci (8%), preko klasa `page-hero--kompas` i `section--kompas`. Pošto je
  vektor, oštar je na svakoj veličini i težak je 1,2 KB.
- Kartice, utisci i polja forme su blago providno beli uz `backdrop-filter`,
  pa se roze pozadina nazire kroz njih.
- **Motiv:** faseta — trougao preuzet sa papirnog srca sa fotografije. Koristi
  se kao marker sekcija, razdelnik i okvir portreta.
- **Boje** su definisane kao CSS promenljive na vrhu `assets/css/style.css`;
  promenom jedne vrednosti menja se ceo sajt.
- **Roza je umekšana** u odnosu na original iz logotipa: `#E5187E` (zasićenost 80%)
  → `#C24178` (zasićenost 51%), isti ton. Promenjeni su i sami fajlovi logotipa
  (`logo-sg.png`, `logo-pun.png`, `favicon.png`) i kompas, da slike ne budu
  drečavije od ostatka sajta. Crni potpis „Sanja Grubor" na logotipu je netaknut.
  Bela slova na roze dugmetu sada imaju kontrast 4,86:1 (ranije 4,40:1), čime
  dugme prelazi prag pristupačnosti AA.
- Sajt je responzivan, ima vidljiv fokus za tastaturu, poštuje
  `prefers-reduced-motion` i radi i kada je JavaScript isključen.

## Mobilni prikaz

- Ispod 1080 px meni se sklapa u dugme sa tri crte, koje se pri otvaranju
  pretvara u X. Meni se zatvara klikom na stavku i tasterom Escape.
- Ispod 640 px: zaglavlje je niže (64 px), portreti su centrirani i uži,
  a dugmad idu preko cele širine radi lakšeg pogotka prstom.
- Polja u formi imaju veličinu slova 16 px, čime se sprečava automatsko
  uvećavanje ekrana na iPhone-u pri kucanju.
- Zid utisaka na telefonu prelazi u jednu kolonu.
- Provereno na 360, 390, 1024 i 1280 px — nigde nema vodoravnog pomeranja.
