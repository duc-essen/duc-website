/**
 * Custom Astro Content Loader fuer Vereinsplaner-iCal-Feed.
 *
 * Wird zur Build-Zeit aufgerufen, holt den oeffentlichen iCal-Feed,
 * filtert interne Termine (Training, Vorstandssitzung, Apnoe-Training) raus
 * und liefert eine Liste oeffentlicher Events.
 *
 * Bei Netz-/Parse-Fehlern: leere Liste zurueck, Build laeuft trotzdem durch
 * (alte Site bleibt live).
 */
import type { Loader } from 'astro/loaders';

const ICAL_URL =
  'https://api.vereinsplaner.at/v1/public/ical/3b22bae6-cb37-4e7c-8da4-f69f4563fd82.ics';

// Events deren SUMMARY eines dieser Patterns matched, werden gefiltert.
// Case-insensitive, irgendwo im Titel.
const DENY_PATTERNS: RegExp[] = [
  /training/i,
  /vorstand/i,
  /papnoe/i,
];

interface VEvent {
  type: string;
  uid?: string;
  summary?: string;
  description?: string;
  start?: Date;
  end?: Date;
  location?: string;
  url?: string;
}

export function vereinsplanerLoader(): Loader {
  return {
    name: 'vereinsplaner-ical',
    load: async ({ store, logger, parseData, generateDigest }) => {
      store.clear();
      let events: VEvent[];
      try {
        const ical = (await import('node-ical')) as unknown as {
          async: { fromURL: (url: string) => Promise<Record<string, VEvent>> };
        };
        const raw = await ical.async.fromURL(ICAL_URL);
        events = Object.values(raw).filter((e) => e.type === 'VEVENT');
        logger.info(`Geladen: ${events.length} VEVENTs aus Vereinsplaner.`);
      } catch (err) {
        logger.error(
          `Vereinsplaner-Feed nicht erreichbar: ${(err as Error).message}. ` +
            `Veranstaltungen-Sektion wird leer angezeigt.`
        );
        return;
      }

      const now = Date.now();
      const upcoming = events
        .filter((e) => {
          if (!e.start) return false;
          if (new Date(e.start).getTime() <= now) return false;
          if (!e.summary) return false;
          if (DENY_PATTERNS.some((p) => p.test(e.summary!))) return false;
          return true;
        })
        .sort((a, b) => new Date(a.start!).getTime() - new Date(b.start!).getTime());

      logger.info(`Davon oeffentlich + zukuenftig: ${upcoming.length}.`);

      for (const e of upcoming) {
        const data = {
          summary: e.summary!,
          start: new Date(e.start!),
          end: e.end ? new Date(e.end) : undefined,
          location: e.location,
          description: (e.description ?? '').trim(),
          url: e.url,
        };
        const parsed = await parseData({ id: String(e.uid), data });
        store.set({
          id: String(e.uid),
          data: parsed,
          digest: generateDigest(parsed),
        });
      }
    },
  };
}
