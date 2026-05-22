/**
 * wedding-config.ts
 * ─────────────────────────────────────────────────────────────
 * Edita este archivo para personalizar toda la invitación.
 * No necesitas tocar ningún otro archivo para cambiar textos.
 * ─────────────────────────────────────────────────────────────
 */

export type ItinerarySide = "left" | "right";
export type ItineraryIconKey = "church" | "scroll" | "glasses" | "disco";

export type ItineraryEvent = {
  side: ItinerarySide;
  /** Líneas de texto del evento (puede tener 1 o 2 líneas) */
  lines: string[];
  time: string;
  icon: ItineraryIconKey;
};

export const weddingConfig = {
  /* ── Nombres ─────────────────────────────────────────────── */
  couple: {
    bride: "Luisa",
    groom: "Axel",
  },

  /* ── Fecha y hora ────────────────────────────────────────── */
  date: {
    /** Formato ISO — se usa para el contador regresivo */
    iso: "2026-07-30T18:00:00",
    /** Día de la semana — aparece en la tarjeta de invitación */
    dayOfWeek: "Jueves",
    /** Fecha con puntos — aparece en la tarjeta de invitación */
    cardDate: "30 · Julio · 2026",
    /** Hora — aparece en la tarjeta de invitación */
    cardTime: "6:00 PM",
    /** Primera línea de fecha en la escena de detalles */
    detailsLine1: "Jueves, 30 de Julio",
    /** Segunda línea de fecha en la escena de detalles */
    detailsLine2: "de 2026",
    /** Fecha que aparece sobre la foto principal */
    photoDisplay: "30 · Julio · 2026",
  },

  /* ── Lugares ─────────────────────────────────────────────── */
  venues: {
    /** Venue que aparece en la tarjeta principal */
    card: {
      name: "Hacienda San Miguel",
      city: "Guadalajara, Jalisco",
    },
    /** Escena de detalles — ceremonia religiosa */
    church: {
      line1: "Misa en la Capilla",
      line2: "de la Santa Cruz",
    },
    /** Escena de detalles — recepción */
    reception: {
      line1: "Recepción en Hotel",
      line2: "Los Mangos",
    },
  },

  /* ── Tarjeta de invitación ───────────────────────────────── */
  card: {
    inviteMain: "Tenemos el honor de invitarte",
    inviteSub: "a celebrar nuestra unión en matrimonio",
    buttonLabel: "Ver más",
  },

  /* ── Sobre ───────────────────────────────────────────────── */
  envelope: {
    hint: "Toca para abrir",
  },

  /* ── Escena de foto + contador ───────────────────────────── */
  photo: {
    tagline: "Con todo nuestro amor",
  },

  /* ── Escena de detalles del evento ───────────────────────── */
  details: {
    title1: "Únanse a nosotros",
    title2: "para celebrar nuestro amor",
  },

  /* ── Itinerario ──────────────────────────────────────────── */
  itinerary: {
    title: "Itinerario",
    events: [
      { side: "left",  lines: ["Ceremonia", "Religiosa"], time: "5:00 PM", icon: "church"  },
      { side: "right", lines: ["Ceremonia", "Civil"],     time: "7:00 PM", icon: "scroll"  },
      { side: "left",  lines: ["Recepción"],              time: "8:00 PM", icon: "glasses" },
      { side: "right", lines: ["Comienza", "el baile"],   time: "9:00 PM", icon: "disco"   },
    ] as ItineraryEvent[],
  },

  /* ── Galería de fotos ────────────────────────────────────── */
  gallery: {
    title1: "Así comienza",
    title2: "nuestra historia",
    /** Cantidad de fotos en /public/assets/ (1.jpg … N.jpg) */
    photoCount: 6,
  },

  /* ── Despedida ───────────────────────────────────────────── */
  farewell: {
    quote: "Las mejores cosas de la vida merecen ser compartidas. Gracias por celebrar con nosotros!",
    tagline: "con amor",
  },

  /* ── Contador regresivo ──────────────────────────────────── */
  countdown: {
    label: "Faltan",
  },
};
