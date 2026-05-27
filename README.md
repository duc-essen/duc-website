# DUC Essen Website

Quellcode der Vereinswebsite des **Deutschen Unterwasserclub Essen e.V.**

- **Live:** [duc-essen.github.io/duc-website](https://duc-essen.github.io/duc-website/) (Default-URL bis DNS-Umzug auf [duc-essen.de](https://duc-essen.de))
- **Stack:** [Astro v6](https://astro.build/), statisches Hosting auf GitHub Pages, Deployment via GitHub Actions.

## Lokale Entwicklung

```bash
npm install
npm run dev          # Dev-Server auf http://localhost:4321
npm run build        # Production-Build nach dist/
npm run preview      # Production-Build lokal vorschauen
```

## Inhalte pflegen (Markdown-Workflow)

Die meisten Inhalte liegen als Markdown bzw. JSON in [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) — neue oder geaenderte Eintraege brauchen **keinen Astro-Code anzufassen**:

| Bereich | Pfad | Format |
|---|---|---|
| Veranstaltungen & Tipps | `src/content/veranstaltungen/*.md` | Markdown mit Frontmatter |
| Geschichte / Timeline | `src/content/geschichte/*.md` | Markdown mit Frontmatter |
| Vorstand (Footer) | `src/data/vorstand.json` | JSON-Liste |
| Mitgliedsbeitraege | `src/data/preise.json` | JSON-Liste |

Schema und erlaubte Felder: [`src/content.config.ts`](./src/content.config.ts).

Reine Layout-Texte (Hero-Tagline, Trainingszeiten, Kontaktdaten) liegen vorerst direkt in den Astro-Komponenten unter `src/components/`.

## Deployment

Push auf `main` ⇒ GitHub Actions ([`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)) baut und deployed nach GitHub Pages. Kein manueller Schritt noetig.

## Weitere Doku

- **[AGENTS.md](./AGENTS.md)** — Projektkontext, Konventionen, Verzeichnis-Layout (auch fuer KI-Agenten als Briefing geeignet; `CLAUDE.md` ist Symlink darauf).
- **[TODO.md](./TODO.md)** — offene Punkte (GitHub Pages aktivieren, DNS-Umzug, Cleanup).
- **Interner Wiki-Artikel** (nur Vereinsmitglieder): [Website-Migration Astro + GitHub Pages](https://github.com/martjn-net/deutscher_unterwasserclub_essen/blob/main/wiki/concepts/website-migration-astro-github-pages.md).
