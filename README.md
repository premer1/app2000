# Utopia Turistforening – APP2000

Gruppeprosjekt i APP2000 for studieåret 2025/2026. Repoet inneholder
statiske low-fidelity-prototyper for en turapp. Løsningene skal lages med HTML
og CSS, uten backend eller database.

Nettsiden ligger på <https://premer1.github.io/app2000/>.

## Innhold

Prototype 1 ligger i rotmappen og demonstrerer:

- søk etter turer basert på sted, fylke og turtype
- turer til fots, på sykkel, på ski og til fjelltopper
- medlemskap for barn, voksne, familier og seniorer
- et visuelt chatvindu for turvenner og grupper
- responsivt oppsett for mobil, nettbrett og PC

Prototype 2 har en klargjort arbeidsmappe i `prototypes/prototype-2/`.

## Mappestruktur

```text
app2000/
├── index.html                    # Prototype 1 og GitHub Pages-forside
├── styles.css                   # Stiler for prototype 1
├── prototypes/
│   └── prototype-2/
│       ├── index.html           # HTML for prototype 2
│       ├── styles.css           # Stiler for prototype 2
│       └── assets/              # Bilder og andre lokale ressurser
└── README.md                    # Prosjektinformasjon
```

Hold filene, CSS og bilder til prototype 2 inne i mappen for prototype 2. Da
kan begge løsningene utvikles og vurderes uavhengig av hverandre.

## Slik kommer dere i gang

Installer [Git](https://git-scm.com/) hvis det ikke allerede er installert. Klon
deretter repoet:

```sh
git clone https://github.com/premer1/app2000.git
cd app2000
```

Åpne `index.html` direkte i nettleseren, eller start en enkel lokal server:

```sh
python3 -m http.server 8000
```

Åpne <http://localhost:8000> for prototype 1 eller
<http://localhost:8000/prototypes/prototype-2/> for prototype 2.

## Legg til endringer

Opprett en egen branch før du begynner. Bruk gjerne fornavn og en kort
beskrivelse i branch-navnet:

```sh
git switch main
git pull
git switch -c navn/prototype-2
```

Gjør endringene dine i `prototypes/prototype-2/`. Kontroller deretter hvilke
filer som er endret, før du lager en commit og sender branchen til GitHub:

```sh
git status
git add prototypes/prototype-2
git commit -m "Legg til prototype 2"
git push -u origin navn/prototype-2
```

Opprett til slutt en pull request på GitHub. Be minst ett gruppemedlem se over
endringene før de flettes inn i `main`.

## Enkle samarbeidsregler

- Hent siste versjon av `main` før du starter nytt arbeid.
- Bruk én branch per oppgave eller endring.
- Skriv korte og tydelige commit-meldinger.
- Ikke legg passord, API-nøkler eller personopplysninger i repoet.
- Test siden på både smal og bred skjerm før du oppretter en pull request.
- Avtal med gruppen før du endrer filer noen andre jobber aktivt med.

## Avgrensning

Skjemaer og chat er kun visuelle demonstrasjoner. De lagrer eller sender ikke
data, og prosjektet bruker ikke JavaScript, backend eller database.
