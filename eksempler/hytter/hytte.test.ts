import { test } from "node:test";
import assert from "node:assert/strict";
import data from "./hytter.json" with { type: "json" };
import { lesHytter, snittStjerner, lavestePris, hytteSammendrag, erHytte } from "./hytte.ts";

const hytter = lesHytter(data);
const [gjendesheim, fjellbu] = hytter;

test("leser alle hyttene fra JSON", () => {
  assert.equal(hytter.length, 2);
});

test("snitt av stjerner, og null uten anmeldelser", () => {
  assert.equal(snittStjerner(gjendesheim), 4.5);
  assert.equal(snittStjerner(fjellbu), null);
});

test("laveste pris avhenger av medlemskap", () => {
  assert.equal(lavestePris(gjendesheim, true), 345);
  assert.equal(lavestePris(gjendesheim, false), 495);
});

test("sammendraget inneholder nøkkelinformasjon", () => {
  const tekst = hytteSammendrag(fjellbu);
  assert.match(tekst, /Fjellbu \(ubetjent\), 1240 moh\./);
  assert.match(tekst, /ingen anmeldelser/);
});

test("avviser ugyldige data", () => {
  assert.equal(erHytte({ ...gjendesheim, betjening: "betjnet" }), false);
  assert.equal(erHytte({ ...gjendesheim, anmeldelser: [{ stjerner: 7 }] }), false);
  assert.throws(() => lesHytter({ hytter: [{ navn: "Uten id" }] }), /indeks 0/);
});
