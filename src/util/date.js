export function getFormattedDate(date, isInput) {
  if (!date) return null; // Verifica se a data é nula ou indefinida

  //inicializing variables
  let dateOriginal = date.toString();
  let formatDate = new Date(dateOriginal);

  //Configuring format options
  let options = { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      timeZone: 'UTC'
  };
  //Verifing if the date is in a input
  if(isInput){
    return date.toISOString().slice(0, 10);;
  }

  return formatDate.toLocaleDateString('en-US', options);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}