import { findAllByUsernamePattern } from '../appArea/Project/services/Api/User';

let timer = 0;
const resultsBlock = document.getElementById('autocomplete-results');
const currentContributors = document.getElementById('current-contributors');
export let contributors = [];


/**
 * We want to wait the user to stop typing before sending an AJAX request, and not sending any if the field is empty
 */
document.querySelector('input[role=autocomplete]').addEventListener('keyup', (e => {
  if(timer) clearTimeout(timer);

  if (e.target.value !== "") {
    timer = setTimeout(() => {APIsearch(e.target)}, 400)
  } else {
    //resultsBlock.children().remove();
  }
}))


/**
 * Send an AJAX request then display the results of the autocomplete query
 * @param {HTMLElement} element 
 */
const APIsearch = async (element) => {
  let query = element.value
  
  const users = await findAllByUsernamePattern(query)
  displayAutocompleteResults(users, element)
}
  

/**
 * @param {Array} array of results to display 
 */
const displayAutocompleteResults = (array) => {
  let list = ''
  
  array.map((object, index) => {
    // On s'assure de n'afficher que les personnes n'ayant pas encore été ajoutées ni la personne connectée
    if ((!contributors.includes(object.pseudo)) && (object.pseudo !== document.getElementById('current-user').value)) { 
      list += `<li class="result" index=${index}>${object.pseudo}</li>`
    }
  })
  
  while (resultsBlock.firstChild) resultsBlock.removeChild(resultsBlock.lastChild); // On refresh la liste avant d'injecter la nouvelle
  resultsBlock.innerHTML = list;

  handleChoice();
}


/**
 * Results registration and allows to select elements to create a contributor badge
 */
const handleChoice = () => {
  let choices = resultsBlock.children;

  choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
      let element = e.target;
      let name = element.innerHTML;
      
      element.remove();
      currentContributors.innerHTML += `
        <li class="contributor-badge">
          <span class="c-name">${name}</span>
          <img class="delete-icon" src="/assets/icons/delete.svg" />
        </li>`

      contributors[contributors.length] = name;
      handleBadgeDelete()
      })
    })
}


/**
 * We need to be able to delete a contributor badge
 */
const handleBadgeDelete = () => {
  let deleteBadges = document.querySelectorAll('.delete-icon');
  
  deleteBadges.forEach(deleteBadge => {
    deleteBadge.addEventListener('click', (e => {
      let contributorBadge = e.target.parentNode
      let contributorPseudo = contributorBadge.querySelector('.c-name').innerHTML;
  
      contributorBadge.remove();
      contributors = contributors.filter(elm => elm !== contributorPseudo);
    }))
  })
 
}


/**
 * In editing mode, we must retrieve all the contributors in the contributors variable as the page loading
 */
const setInitialContributors = () => {
  let contributorBadges = document.querySelectorAll('.c-name');
  
  contributorBadges.forEach(contributorBadge => {
    contributors[contributors.length] = contributorBadge.innerHTML;
  })
  handleBadgeDelete();
}


setInitialContributors()
