export function getFormattedDate(date) {
  if (!date) return null; // Verifica se a data é nula ou indefinida
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  if (!date) return null; // Verifica se a data é nula ou indefinida
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}