# Hyttevisning i TypeScript

Eksempel på JSON-data for hytter (objekter, underobjekter og arrays) og
TypeScript-funksjoner for å validere og vise dem.

| Fil | Innhold |
|---|---|
| `hytter.json` | Hardkodede eksempeldata for to hytter |
| `hytte.ts` | Typer, validering (`erHytte`, `lesHytter`) og visning (`hytteSammendrag`, `visHytter`) |
| `hytte.test.ts` | Enhetstester med Node sin innebygde testløper |

## Kjør

Krever Node 23.6 eller nyere, som kjører `.ts`-filer direkte.

```sh
cd eksempler/hytter
npm install
npm run typecheck   # tsc --strict, ingen filer skrives
npm test            # node --test
```

`visHytter` bruker DOM og testes i nettleseren eller med Vitest + jsdom.
