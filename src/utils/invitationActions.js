function normalizePhoneNumber(phoneNumber = "") {
  return phoneNumber.replace(/\D/g, "");
}

export function openWhatsApp(weddingData) {
  const rawPhone = weddingData?.rsvp?.whatsappNumber || weddingData?.rsvp?.phone || "50248143247";
  const phone = normalizePhoneNumber(rawPhone) || "50248143247";
  const defaultMsg = weddingData?.rsvp?.defaultMessage || "Hola, deseo confirmar mi asistencia a la boda.";
  const message = encodeURIComponent(defaultMsg);

  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

export async function shareInvitation(weddingData) {
  const shareInformation = {
    title: `Boda de ${weddingData.couple.displayName}`,
    text: `${weddingData.messages.opening} ${weddingData.event.dateLabel}.`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareInformation);
      return "Invitación compartida";
    }

    await navigator.clipboard.writeText(window.location.href);
    return "Enlace copiado";
  } catch (error) {
    if (error?.name === "AbortError") {
      return "";
    }

    window.prompt(
      "Copia el enlace de la invitación:",
      window.location.href
    );

    return "Enlace listo para copiar";
  }
}

function formatCalendarDate(date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

export function downloadCalendarEvent(weddingData) {
  const startDate = new Date(weddingData.event.dateISO);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

  const calendarContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DM Tecnology//Boda Melinda y Mynor//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:boda-melinda-mynor-${startDate.getTime()}@dmtecnology`,
    `DTSTAMP:${formatCalendarDate(new Date())}`,
    `DTSTART:${formatCalendarDate(startDate)}`,
    `DTEND:${formatCalendarDate(endDate)}`,
    `SUMMARY:Boda de ${weddingData.couple.displayName}`,
    `DESCRIPTION:${weddingData.messages.invitation}`,
    `LOCATION:${weddingData.ceremony.name}, ${weddingData.ceremony.city}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const calendarFile = new Blob(
    [calendarContent],
    { type: "text/calendar;charset=utf-8" }
  );

  const downloadUrl = URL.createObjectURL(calendarFile);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = "Boda-Melinda-y-Mynor.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(downloadUrl);
}