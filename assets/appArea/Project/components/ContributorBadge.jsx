import React from 'react';
import { DeleteIcon } from '../../../components/Svg';

const ContributorBadge = ({ username, deletable = false, style = {} }) => {
  return ( 
    <li className="contributor-badge" style={style}>
      <span className="c-name">{ username }</span>
      { deletable && <DeleteIcon className="delete-icon" /> }
    </li>
   );
}
 
export default ContributorBadge;