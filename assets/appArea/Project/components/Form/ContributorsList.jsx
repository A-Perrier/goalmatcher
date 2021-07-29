import React from 'react';
import { COLOR_DANGER } from '../../../../helpers/const';

const styles = {
  taskModal: {
    right: '50%',
    bottom: '-10rem',
    transform: 'translateX(50%)'
  },
  default: {}
}

const ContributorsList = ({ contributors, onChoice, styleType = 'default' }) => {
  return ( 
    <ul class="task__contributors-box" style={styles[styleType]}>
      <li class="contributor" onClick={(e) => onChoice(null)} style={{color: COLOR_DANGER}}>Retirer l'assignation</li>
      { contributors.map((contributor, i) => 
      <li class="contributor" key={i} onClick={(e) => onChoice(contributor.pseudo)}>{contributor.pseudo}</li>) }
    </ul>
  );
}
 
export default ContributorsList;