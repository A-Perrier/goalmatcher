import ReactDOMServer from 'react-dom/server'
import { PRIORITY_HIGH, PRIORITY_HIGH_COLOR, PRIORITY_HIGH_FR, PRIORITY_LOW, PRIORITY_LOW_COLOR, PRIORITY_LOW_FR, PRIORITY_MEDIUM, PRIORITY_MEDIUM_COLOR, PRIORITY_MEDIUM_FR } from './const'
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


/**
 * Converts a priority string from database to the desired format
 * @param {String} priority low|medium|high
 * @param {Boolean} toString returns "Basse"|"Moyenne"|"Haute"
 * @param {Boolean} toHex the color associated in ./const.js
 */
export function convertPriority(priority, toString = true, toHex = false) {
  if (toString) 
    switch (priority) {
      case PRIORITY_LOW:    return PRIORITY_LOW_FR; break
      case PRIORITY_MEDIUM: return PRIORITY_MEDIUM_FR; break
      case PRIORITY_HIGH:   return PRIORITY_HIGH_FR; break
      default:              return 'Inconnue'; break
    }

  if (toHex)
    switch (priority) {
      case PRIORITY_LOW:    return PRIORITY_LOW_COLOR; break
      case PRIORITY_MEDIUM: return PRIORITY_MEDIUM_COLOR; break
      case PRIORITY_HIGH:   return PRIORITY_HIGH_COLOR; break
      default:              return null; break // this will take the default color of the SVG component
    }
}


export function dateTimeToString(datetime) {
  if (datetime === null) return 'Inconnue'

  const date = new Date(datetime)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth()+1)).slice(-2)
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}



export function addToArray(array, item) {
  const copy = array.slice()
  copy.push(item)
  return copy
}



/**
 * Clones an array, remove the chosen element then returns the copy without it
 */
export function removeFromArray(array, item) {
  const copy = array.slice()
  const index = copy.indexOf(item)
  index !== -1 && copy.splice(index, 1)
  return copy
}



/**
 * Clones an array, edit the chosen element then returns the copy modified
 */
export function editFromArray(array, itemUpdated, itemToUpdate) {
  const copy = array.slice()
  const index = copy.indexOf(itemToUpdate)
  index !== -1 && copy.splice(index, 1, itemUpdated)
  return copy
}



export function sortByListOrder(array) {
  return array.sort((a, b) => (a.listOrder > b.listOrder) ? 1 : -1)
}



export function getModal (content) {
  let html = document.querySelector('html')
  let modal = document.createElement('div')
  modal.classList.add('modal')
  modal.innerHTML = `<div id="body-cover"></div>
  <div class="modal__box">
    <img class="modal__close" src="/assets/icons/cross.svg" />
    <div class="modal__content">
      ${ReactDOMServer.renderToStaticMarkup(content)}
    </div>
  </div>`
  
  html.style.overflow = 'hidden'
  html.appendChild(modal)

  document.querySelector('.modal__close').addEventListener('click', () => { removeModal() })
}



const removeModal = () => {
  document.querySelector('.modal').remove();
  document.querySelector('html').style.overflow = 'initial';
}


export const getLoader = () => {
  document.querySelector('html').innerHTML += `
  <div id="body-cover">
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>`
  document.querySelector('html').style.overflow = 'hidden';
}


export const removeLoader = () => {
  document.getElementById('body-cover').remove();
  document.querySelector('html').style.overflow = 'initial';
}