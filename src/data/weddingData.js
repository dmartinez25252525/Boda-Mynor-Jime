const baseUrl = import.meta.env.BASE_URL;

export const weddingData = {
  couple: {
    bride: "Melinda",
    groom: "Mynor",
    displayName: "Melinda & Mynor",
    initials: "M & M",
  },

  event: {
    dateISO: "2026-12-05T16:30:00-06:00",
    dateLabel: "05 de diciembre de 2026",
    shortDate: "05 · 12 · 2026",
    dayLabel: "Sábado",
    timeLabel: "4:30 p. m.",
    timezone: "America/Guatemala",
  },

  ceremony: {
    name: "Iglesia Central Fuente de Agua Viva",
    city: "Villa Nueva, Guatemala",
    address: "Iglesia Central Fuente de Agua Viva, Villa Nueva",
  },

  location: {
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=Iglesia+Central+Fuente+de+Agua+Viva+Villa+Nueva+Guatemala",

    waze:
      "https://www.waze.com/ul?q=Iglesia%20Central%20Fuente%20de%20Agua%20Viva%20Villa%20Nueva%20Guatemala&navigate=yes",
  },

  messages: {
    opening:
      "Con la bendición de Dios, comienza el capítulo más hermoso de nuestra historia.",

    invitation:
      "Queremos compartir contigo la felicidad de nuestra unión y celebrar juntos este momento tan especial.",

    countdown:
      "Con la gracia de Dios, cada día nos acerca al momento de unir nuestras vidas para siempre.",

    confirmation:
      "Tu presencia hará que nuestro día sea todavía más especial.",
  },

  verse: {
    text:
      "Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.",
    reference: "Colosenses 3:14",
  },

  gifts: {
    title: "Lluvia de sobres",
    description:
      "Tu presencia es nuestro mejor regalo, pero si está en tus posibilidades y deseas hacernos un presente, te dejamos esta opción.",
  },

  dressCode: {
    title: "Código de vestimenta",
    type: "Formal",
    description:
      "Queremos verte elegante y cómodo para compartir esta celebración.",
  },

  rsvp: {
    enabled: true,
    whatsappNumber: "50248143247",
    deadline: "20 de noviembre de 2026",
    defaultMessage:
      "Hola, deseo confirmar mi asistencia a la boda de Melinda y Mynor.",
  },

  media: {
    heroImage: `${baseUrl}images/portada.jpg`,
    countdownImage: `${baseUrl}images/conteo.jpg`,
    locationImage: `${baseUrl}images/anillos.jpg`,

    gallery: [
      `${baseUrl}images/foto-1.jpg`,
      `${baseUrl}images/foto-2.jpg`,
      `${baseUrl}images/foto-3.jpg`,
      `${baseUrl}images/foto-4.jpg`,
    ],

    music: `${baseUrl}audio/hasta-mi-final.mp3`  ,
  },

  features: {
    countdown: true,
    music: true,
    gallery: true,
    calendar: true,
    sharing: true,
    location: true,
    dressCode: true,
    gifts: true,
    rsvp: true,
  },
};

export default weddingData;
