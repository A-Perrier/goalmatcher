const urlParameters = window.location.pathname
const urlParts = urlParameters.split('/')
export const location = { 'section' : urlParts[1], 'name': urlParts[2], 'id': urlParts[3] }