import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Sections: Metadaten + section-spezifische Strukturdaten pro Top-Level-Sektion.
// Steuert sowohl den One-Pager (/) als auch die Detail-Seiten (/<slug>).
// Daraus generiert getStaticPaths in src/pages/[slug].astro je eine Detail-URL.
const sections = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    navLabel: z.string().optional(),  // wenn gesetzt: Link erscheint in Navbar
    order: z.number(),
    cta: z.object({ text: z.string(), href: z.string() }).optional(),

    // Training-spezifisch
    training: z
      .object({
        ort: z.string(),
        beschreibung: z.string(),
        schedule: z.array(z.object({ tag: z.string(), zeit: z.string() })),
        bilder: z.array(z.object({ url: z.string().url(), alt: z.string() })),
        mapEmbedUrl: z.string().url(),
      })
      .optional(),

    // Kontakt-spezifisch
    kontakt: z
      .object({
        items: z.array(
          z.object({
            icon: z.enum(['pin', 'pool', 'mail', 'clock']),
            label: z.string(),
            text: z.string(),
          })
        ),
        formEmbedUrl: z.string().url(),
      })
      .optional(),

    // Mitgliedschaften-spezifisch
    mitgliedschaften_footer: z.string().optional(),
  }),
});

// Angebote: 6 Karten (Freitauchen, Hallenbad, Freiwasser, Wettkaempfe, Clubfahrten, App)
const angebote = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/angebote' }),
  schema: z.object({
    titel: z.string(),
    icon: z.enum(['freitauchen', 'hallenbad', 'freiwasser', 'wettkampf', 'clubfahrten', 'app']),
    order: z.number(),
  }),
});

// Mitgliedschaften: CMAS, VDST, TSV NRW
const mitgliedschaften = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mitgliedschaften' }),
  schema: z.object({
    name: z.string(),
    untertitel: z.string(),
    url: z.string().url(),
    logoUrl: z.string().url(),
    order: z.number(),
  }),
});

// Veranstaltungen: 6+ Termine/Tipps, Hauptbeschreibung im Markdown-Body.
const veranstaltungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/veranstaltungen' }),
  schema: z.object({
    titel: z.string(),
    untertitel: z.string(),
    badge_text: z.string(),
    badge_style: z.enum(['gold', 'blue']).default('gold'),
    icon: z.enum(['calendar', 'ship', 'video', 'goggles', 'pool', 'waves']),
    infos: z
      .array(z.object({ label: z.string(), wert: z.string() }))
      .default([]),
    link: z.object({ text: z.string(), url: z.string().url() }).optional(),
    order: z.number(),
  }),
});

// Geschichte: Timeline-Eintraege, Beschreibungstext im Markdown-Body.
const geschichte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/geschichte' }),
  schema: z.object({
    jahr: z.string(),
    titel: z.string(),
    icon: z.enum(['diver', 'document', 'trophy', 'compass', 'star', 'medal']),
    highlight: z.boolean().default(false),
    order: z.number(),
  }),
});

// Vorstand: 5 Personen.
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
    preis_monat: z.string(),
    preis_quartal: z.string(),
    icon: z.enum(['erwachsene', 'familie', 'jugend']),
    order: z.number(),
  }),
});

export const collections = {
  sections,
  angebote,
  mitgliedschaften,
  veranstaltungen,
  geschichte,
  vorstand,
  preise,
};
