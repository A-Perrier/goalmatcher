import React, { useEffect, useState } from 'react';

const Loader = ({ speed = 500 }) => {
  let index = 0
  const texts = [
    "Récupération des données...", 
    "Préparation du café...",
    "Ajout du sucre...",
    "Déballage des Spéculoos...",
    "Auto-trempage des biscuits...",
    "Oups un morceau est tombé dans le café !"
  ]
  const [toDisplay, setToDisplay] = useState(texts[index])
  

  useEffect(() => {
    setInterval(() => {
      texts.length - 1 === index ? index = 0 : index += 1
      setToDisplay(texts[index])
    }, speed)
  }, [])

  
  return ( 
    <div id="body-cover">
      <h1 className="loader-info">{toDisplay}</h1>
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
 
export default Loader;