const urlParameters = window.location.pathname
const urlParts = urlParameters.split('/')
export const location = { 'section' : urlParts[1], 'slug': urlParts[2], 'id': urlParts[3] }

/**
 * @param {String} status 
 */
export function getTranslatedStatus(status) {
  return (
    status === 'ongoing' ? 'En cours' :
    status === 'abandoned' ? 'Abandonné' :
    status === 'completed' ?? 'Terminé'
  ) 
}

export function dateTimeToString(datetime) {
  if (datetime === null) return 'Inconnue'

  const date = new Date(datetime)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth()+1)).slice(-2)
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}