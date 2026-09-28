// Typer for hyttedata. Union-typene gjør at feilstavede verdier som "betjnet" avvises av kompilatoren.
export type Betjening = "betjent" | "selvbetjent" | "ubetjent";
export type Fasilitet =
  | "dusj" | "strøm" | "wifi" | "tørkerom" | "servering" | "vedovn" | "hundevennlig";

export interface Koordinater { lat: number; lon: number }

export interface Lokasjon {
  koordinater: Koordinater;
  hoydeMoh: number;
  kommune: string;
  fylke: string;
}

export interface Pris { kategori: string; medlem: number; ikkeMedlem: number }

export interface Anmeldelse {
  brukerId: string;
  stjerner: 1 | 2 | 3 | 4 | 5;
  tekst: string;
  dato: string; // ISO 8601, f.eks. "2025-08-03"
}

export interface Hytte {
  id: string;
  navn: string;
  betjening: Betjening;
  beskrivelse: string;
  lokasjon: Lokasjon;
  kapasitet: { senger: number; rom: number };
  priser: { valuta: "NOK"; overnatting: Pris[] };
  fasiliteter: Fasilitet[];
  apningsperioder: { fra: string; til: string }[];
  kontakt: { telefon?: string; epost?: string };
  lokallag: string;
  anmeldelser: Anmeldelse[];
}

const BETJENING: readonly Betjening[] = ["betjent", "selvbetjent", "ubetjent"];

// Typene finnes bare ved kompilering. Data fra JSON eller et REST-API må derfor sjekkes ved kjøring.
export function erHytte(verdi: unknown): verdi is Hytte {
  if (typeof verdi !== "object" || verdi === null) return false;
  const h = verdi as Record<string, any>;
  return (
    typeof h.id === "string" &&
    typeof h.navn === "string" &&
    BETJENING.includes(h.betjening) &&
    typeof h.lokasjon?.koordinater?.lat === "number" &&
    typeof h.lokasjon?.koordinater?.lon === "number" &&
    typeof h.lokasjon?.hoydeMoh === "number" &&
    typeof h.kapasitet?.senger === "number" &&
    Array.isArray(h.priser?.overnatting) &&
    Array.isArray(h.fasiliteter) &&
    Array.isArray(h.apningsperioder) &&
    Array.isArray(h.anmeldelser) &&
    h.anmeldelser.every((a: any) => Number.isInteger(a?.stjerner) && a.stjerner >= 1 && a.stjerner <= 5)
  );
}

export function lesHytter(data: unknown): Hytte[] {
  const liste = (data as { hytter?: unknown })?.hytter;
  if (!Array.isArray(liste)) throw new Error("Mangler listen 'hytter'");
  const ugyldig = liste.findIndex((h) => !erHytte(h));
  if (ugyldig !== -1) throw new Error(`Ugyldig hytte på indeks ${ugyldig}`);
  return liste;
}

export function snittStjerner(hytte: Hytte): number | null {
  if (hytte.anmeldelser.length === 0) return null;
  const sum = hytte.anmeldelser.reduce((s, a) => s + a.stjerner, 0);
  return Math.round((sum / hytte.anmeldelser.length) * 10) / 10;
}

export function lavestePris(hytte: Hytte, medlem: boolean): number | null {
  const priser = hytte.priser.overnatting.map((p) => (medlem ? p.medlem : p.ikkeMedlem));
  return priser.length > 0 ? Math.min(...priser) : null;
}

// Ren funksjon uten DOM, slik at den kan testes direkte i Node.
export function hytteSammendrag(hytte: Hytte, medlem = true): string {
  const snitt = snittStjerner(hytte);
  const pris = lavestePris(hytte, medlem);
  return [
    `${hytte.navn} (${hytte.betjening}), ${hytte.lokasjon.hoydeMoh} moh.`,
    `${hytte.lokasjon.kommune}, ${hytte.lokasjon.fylke}: ${hytte.kapasitet.senger} senger`,
    `Fra ${pris ?? "–"} ${hytte.priser.valuta} (${medlem ? "medlem" : "ikke medlem"})`,
    `Fasiliteter: ${hytte.fasiliteter.join(", ") || "ingen"}`,
    `Vurdering: ${snitt === null ? "ingen anmeldelser" : `${snitt}/5 (${hytte.anmeldelser.length})`}`,
  ].join("\n");
}

// Viser hyttene i nettleseren. textContent (ikke innerHTML) hindrer XSS hvis data kommer fra brukere.
export function visHytter(hytter: Hytte[], container: HTMLElement, medlem = true): void {
  container.replaceChildren(
    ...hytter.map((hytte) => {
      const kort = document.createElement("article");
      kort.className = `hyttekort hyttekort--${hytte.betjening}`;
      const tittel = document.createElement("h3");
      tittel.textContent = hytte.navn;
      const tekst = document.createElement("p");
      tekst.style.whiteSpace = "pre-line";
      tekst.textContent = hytteSammendrag(hytte, medlem);
      kort.append(tittel, tekst);
      return kort;
    }),
  );
}
