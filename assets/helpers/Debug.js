function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


/**
 * If a DD is thrown in Ajax, makes it appear on screen
 * @param {String} AjaxResponse 
 * @param {Integer} leftPos 
 * @param {Integer} bottomPos 
 */
export const debugDDResponse = (AjaxResponse, leftPos = "2rem", bottomPos = "4rem") => {
  // Si on reçoit un DD dans la réponse Ajax
  if ((typeof AjaxResponse === 'string') && (AjaxResponse.charAt(0) === "<")) {
    let divIndex = 50 + document.querySelectorAll('.debug-block').length;
    
    let debugBlock = document.createElement('div');
    debugBlock.innerHTML = `
    <div class="debug-block" index="${divIndex + 1}" style="position:fixed; max-width:50%; height:fit-content; bottom: ${bottomPos}; left: ${leftPos}; cursor:move; z-index:${divIndex + 1};">
    <span class="delete-icon" style="cursor:pointer; marginLeft:auto;">
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z" fill="#EB8B84"/>
      </svg>
    </span>`
      + AjaxResponse + 
    '</div>';

    document.body.appendChild(debugBlock);
    
    dragElement(document.querySelector(`.debug-block[index='${divIndex + 1}']`));

    // Permet la fermeture de la fenêtre
    document.querySelectorAll('.debug-block .delete-icon').forEach(el => el.addEventListener('click', (e) => {
      e.currentTarget.parentNode.remove();
    }))
  }
}