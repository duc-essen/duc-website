/**
 * Zentrale SVG-Map fuer alle Icons der Site.
 *
 * Struktur: ICON_SVGS[<catalog>][<name>] = raw SVG markup string
 *
 * Wird von src/components/Icon.astro per `Fragment set:html` gerendert.
 * Slug-Listen (welcher Catalog welche Slugs erlaubt) stehen in
 * src/types/icons.ts und werden auch im Zod-Schema von content.config.ts
 * verwendet.
 */

import type {
  AngebotIconName,
  TimelineIconName,
  PriceIconName,
  EventIconName,
  KontaktIconName,
} from '../types/icons';

export type IconCatalog =
  | 'angebot'
  | 'timeline'
  | 'price'
  | 'event'
  | 'kontakt';

export type IconName =
  | AngebotIconName
  | TimelineIconName
  | PriceIconName
  | EventIconName
  | KontaktIconName;

type IconMap<Catalog extends IconCatalog> = Record<
  Catalog extends 'angebot' ? AngebotIconName :
  Catalog extends 'timeline' ? TimelineIconName :
  Catalog extends 'price' ? PriceIconName :
  Catalog extends 'event' ? EventIconName :
  Catalog extends 'kontakt' ? KontaktIconName : never,
  string
>;

export const ICON_SVGS: {
  angebot: IconMap<'angebot'>;
  timeline: IconMap<'timeline'>;
  price: IconMap<'price'>;
  event: IconMap<'event'>;
  kontakt: IconMap<'kontakt'>;
} = {
  // ===== ANGEBOT-Icons (48×48, weisser stroke, gold accents) =====
  angebot: {
    freitauchen: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="1.5"><ellipse cx="12" cy="10" rx="8" ry="5"/><path d="M4 10v3c0 2.5 3.5 5 8 5s8-2.5 8-5v-3" stroke="#FFD400"/><circle cx="8" cy="9" r="2" fill="#FFD400"/><circle cx="16" cy="9" r="2" fill="#FFD400"/></svg>',
    hallenbad: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="2"><circle cx="12" cy="5" r="3"/><path d="M4 14c2-2 5-3 8-3s6 1 8 3"/><path d="M6 18c2-1.5 4-2 6-2s4 .5 6 2" stroke="#FFD400"/><path d="M8 11l-3 3M16 11l3 3"/></svg>',
    freiwasser: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="2"><path d="M2 12c1.5-1.5 3-2 5-2s3.5.5 5 2 3 2 5 2 3.5-.5 5-2"/><path d="M2 17c1.5-1.5 3-2 5-2s3.5.5 5 2 3 2 5 2 3.5-.5 5-2" stroke="#FFD400"/><path d="M2 7c1.5-1.5 3-2 5-2s3.5.5 5 2 3 2 5 2 3.5-.5 5-2"/></svg>',
    wettkampf: '<svg viewBox="0 0 24 24" width="48" height="48" fill="#FFD400" stroke="#ffffff" stroke-width="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C6 4 6 5.5 6 5.5V9zm12 0h1.5a2.5 2.5 0 0 0 0-5C18 4 18 5.5 18 5.5V9z"/><path d="M4 22h16v-4H4z"/><path d="M6 18V9h12v9"/><path d="M12 4v5"/></svg>',
    clubfahrten: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="2"><path d="M12 2L4 7v2h16V7L12 2z" fill="#FFD400"/><path d="M4 9l8 5 8-5"/><path d="M4 14l8 5 8-5"/><circle cx="12" cy="17" r="2" fill="#FFD400"/></svg>',
    app: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01" stroke-width="3" stroke="#FFD400"/><path d="M9 5h6"/></svg>',
  },

  // ===== TIMELINE-Icons (24×24, blauer stroke, gold accents) =====
  timeline: {
    diver: '<svg viewBox="0 0 24 24" fill="none" stroke="#004F9E" stroke-width="2"><circle cx="12" cy="5" r="3"/><path d="M5 22c0-5 3-7 7-7s7 2 7 7"/><path d="M5 12h14" stroke="#FFD400"/></svg>',
    document: '<svg viewBox="0 0 24 24" fill="none" stroke="#004F9E" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8" stroke="#FFD400"/><path d="M8 17h8" stroke="#FFD400"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="#FFD400" stroke="#004F9E" stroke-width="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C6 4 6 5.5 6 5.5V9zm12 0h1.5a2.5 2.5 0 0 0 0-5C18 4 18 5.5 18 5.5V9z"/><path d="M4 22h16v-4H4z"/><path d="M6 18V9h12v9"/><path d="M12 4v5"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="#004F9E" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="#FFD400" stroke="#FFD400"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="#FFD400" stroke="#004F9E" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    medal: '<svg viewBox="0 0 24 24" fill="#FFD400" stroke="#004F9E" stroke-width="1.5"><circle cx="12" cy="8" r="6"/><path d="M12 14v8"/><path d="M8 22h8"/><path d="M9 6l3 3 3-3" stroke="#004F9E" fill="none" stroke-width="2"/></svg>',
  },

  // ===== PRICE-Icons (48×48, blauer stroke, gold fill) =====
  price: {
    erwachsene: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#004F9E" stroke-width="2"><circle cx="12" cy="7" r="4" fill="#FFD400"/><path d="M5.5 21c0-4.5 3-7 6.5-7s6.5 2.5 6.5 7"/></svg>',
    familie: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#004F9E" stroke-width="2"><circle cx="9" cy="7" r="3" fill="#FFD400"/><circle cx="17" cy="7" r="2.5" fill="#FFD400"/><path d="M3 21c0-3.5 2.5-5.5 5.5-5.5"/><path d="M21 21c0-3 2-4.5 0-4.5"/><path d="M9 15.5c2 0 4 1 5 3"/><circle cx="13" cy="11" r="2" fill="#FFD400"/><path d="M13 13c-2 0-3.5 1.5-3.5 4"/></svg>',
    jugend: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#004F9E" stroke-width="2"><circle cx="12" cy="6" r="3" fill="#FFD400"/><path d="M7 21v-4c0-2.5 2-4 5-4s5 1.5 5 4v4"/><path d="M9 13l-1 8M15 13l1 8"/></svg>',
  },

  // ===== EVENT-Icons (32×32, blauer stroke, gold accents) =====
  event: {
    calendar: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#004F9E" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 1v3M15 1v3" stroke="#FFD400"/><path d="M9 10h6M9 14h6M9 18h3"/></svg>',
    ship: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#004F9E" stroke-width="2"><path d="M2 20c2-1 4-2 6-2s4 1 6 2 4 1 6 0"/><path d="M4 17l3-11h10l3 11" fill="#FFD400"/><path d="M12 6V2M12 6l-5 3M12 6l5 3"/></svg>',
    video: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#004F9E" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polygon points="10 9 16 12 10 15" fill="#FFD400"/></svg>',
    goggles: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#004F9E" stroke-width="1.5"><ellipse cx="12" cy="10" rx="8" ry="5"/><path d="M4 10v3c0 2.5 3.5 5 8 5s8-2.5 8-5v-3" stroke="#FFD400"/><circle cx="8" cy="9" r="2" fill="#FFD400"/><circle cx="16" cy="9" r="2" fill="#FFD400"/></svg>',
    pool: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#004F9E" stroke-width="2"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 14h18" stroke="#FFD400"/><path d="M8 8V5M16 8V5"/><circle cx="12" cy="17" r="2" fill="#FFD400"/></svg>',
    waves: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#004F9E" stroke-width="2"><path d="M2 12c1.5-1.5 3-2 5-2s3.5.5 5 2 3 2 5 2 3.5-.5 5-2"/><path d="M2 17c1.5-1.5 3-2 5-2s3.5.5 5 2 3 2 5 2 3.5-.5 5-2" stroke="#FFD400"/><path d="M2 7c1.5-1.5 3-2 5-2s3.5.5 5 2 3 2 5 2 3.5-.5 5-2"/></svg>',
  },

  // ===== KONTAKT-Icons (40×40, blauer stroke, kontaktspezifisch) =====
  kontakt: {
    pin: '<svg viewBox="0 0 24 24" width="40" height="40" fill="#004F9E" stroke="#004F9E" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="3" fill="#ffffff"/></svg>',
    pool: '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#004F9E" stroke-width="2"><path d="M2 12c1.5-1.5 3-2 5-2s3.5.5 5 2 3 2 5 2 3.5-.5 5-2"/><path d="M2 17c1.5-1.5 3-2 5-2s3.5.5 5 2 3 2 5 2 3.5-.5 5-2"/><circle cx="12" cy="7" r="3" fill="#004F9E"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#004F9E" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#004F9E" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  },
};
