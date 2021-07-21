import React from 'react';

export const SectionModal = ({ content }) => {
  return ( 
    <span className="modal-content">
      <h3>Informations sur la section</h3>
      <p className="modal-content__editable">{ content }</p>
    </span>
  );
}
 