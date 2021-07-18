import React from 'react';

const ContributorBadge = ({ username }) => {
  return ( 
    <li className="contributor-badge">
      <span className="c-name">{ username }</span>
    </li>
   );
}
 
export default ContributorBadge;