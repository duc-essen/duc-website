import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Veranstaltungen: 6+ Termine/Tipps, Hauptbeschreibung im Markdown-Body.
const veranstaltungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/veranstaltungen' }),
  schema: z.object({
    titel: z.string(),
    untertitel: z.string(),
    badge_text: z.string(),                                  // z.B. "Fr. 20. März 2026"
    badge_style: z.enum(['gold', 'blue']).default('gold'),   // gold = fester Termin, blau = laufend/Tipp
    icon: z.enum([
      'calendar',    // JHV
      'ship',        // boot Düsseldorf
      'video',       // Ocean Film Tour
      'goggles',     // Meet & Greet Apnoe
      'pool',        // Monte Mare
      'waves',       // Dive4Life
    ]),
    infos: z
      .array(
        z.object({
          label: z.string(),
          wert: z.string(),
        })
      )
      .default([]),
    link: z
      .object({
        text: z.string(),
        url: z.string().url(),
      })
      .optional(),
    order: z.number(),
  }),
});

// Geschichte: Timeline-Eintraege, Beschreibungstext im Markdown-Body
// (kann inline HTML enthalten, z.B. fuer Medaillen-SVGs in der Highlight-Karte).
const geschichte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/geschichte' }),
  schema: z.object({
    jahr: z.string(),                                        // "1961" oder "18. Mai 2025"
    titel: z.string(),
    icon: z.enum([
      'diver',       // 1961 Gruendung
      'document',    // 1980er VDST
      'trophy',      // 1990er Wettkampf
      'compass',     // 2000er Ausbildung
      'star',        // 2010er LLSP
      'medal',       // 2025 DM
    ]),
    highlight: z.boolean().default(false),
    order: z.number(),
  }),
});

// Vorstand: 5 Personen, nur rolle + name -> JSON-Array, kein Markdown-Body.
const vorstand = defineCollection({
  loader: file('src/data/vorstand.json'),
  schema: z.object({
    rolle: z.string(),
    name: z.string(),
    order: z.number(),
  }),
});

// Preise: 3 Mitgliedsbeitrags-Stufen.
const preise = defineCollection({
  loader: file('src/data/preise.json'),
  schema: z.object({
    gruppe: z.string(),
    preis_monat: z.string(),    // "8,50 €"
    preis_quartal: z.string(),  // "25,50 €"
    icon: z.enum(['erwachsene', 'familie', 'jugend']),
    order: z.number(),
  }),
});

export const collections = { veranstaltungen, geschichte, vorstand, preise };
