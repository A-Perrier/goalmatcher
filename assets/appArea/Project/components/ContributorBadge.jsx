import React from 'react';
import { DeleteIcon } from '../../../components/Svg';

const ContributorBadge = ({ username, deletable = false }) => {
  return ( 
    <li className="contributor-badge">
      <span className="c-name">{ username }</span>
      { deletable && <DeleteIcon className="delete-icon" /> }
    </li>
   );
}
 
export default ContributorBadge;