const baseUrl = import.meta.env.BASE_URL;

export const weddingData = {
  couple: {
    groom: "Mynor",
    bride: "Melinda",
    displayName: "Mynor & Melinda",
    initials: "M & M",
  },

  event: {
    dateISO: "2026-12-05T16:00:00-06:00",
    dateLabel: "Sábado 05 de diciembre de 2026 - 4:00 p. m.",
    shortDate: "05 · 12 · 2026",
    dayLabel: "Sábado",
    timeLabel: "4:00 p. m.",
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
      "Con mucha alegría queremos compartir contigo una noticia muy especial. ¡Ha llegado el momento de celebrar nuestro amor y comenzar juntos una nueva etapa!",

    invitation: "Nuestro amor nos trae hasta aquí, y nuestro sueño es celebrar este nuevo comienzo junto a las personas que forman parte de nuestra historia. 🤍\n\n¡Nos encantará que seas parte de este día inolvidable!",

    countdown:
      "Con la gracia de Dios, cada día nos acerca al momento de unir nuestras vidas para siempre.",

    confirmation:
      "Esperamos contar contigo para hacer de este momento un recuerdo inolvidable. Con mucho cariño, Mynor y Meli ❤️",
  },

  verse: {
    text:
      "“Mejores son dos que uno.”",
    reference: "Eclesiastés 4:9 ❤️",
  },

  gifts: {
    title: "Lluvia de sobres",
    description:
      "Su presencia es el regalo más valioso para nosotros.\n\nSi desean acompañarnos con un detalle para nuestro nuevo hogar, agradeceremos de corazón su aporte en efectivo dentro de un sobre.\n\nGracias por ser parte del inicio de nuestra historia. ✨",
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
      "Hola, deseo confirmar mi asistencia a la boda de Mynor y Melinda.",
  },

  media: {
    heroImage: `${baseUrl}images/6.jpeg`,
    countdownImage: `${baseUrl}images/2.jpeg`,
    locationImage: `${baseUrl}images/10.jpeg`,

    gallery: [
      `${baseUrl}images/1.jpeg`,
      `${baseUrl}images/2.jpeg`,
      `${baseUrl}images/3.jpeg`,
      `${baseUrl}images/4.jpeg`,
      `${baseUrl}images/5.jpeg`,
      `${baseUrl}images/7.jpeg`,
      `${baseUrl}images/8.jpeg`,
      `${baseUrl}images/9.jpeg`,
      `${baseUrl}images/10.jpeg`,
      `${baseUrl}images/11.jpeg`,
    ],

    music: `${baseUrl}audio/hasta-mi-final.mp3?v=20261008`,
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