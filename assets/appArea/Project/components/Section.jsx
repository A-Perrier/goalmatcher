import React from 'react';
import SectionActionBox from './ActionBox/SectionActionBox';

const Section = ({ section }) => {

  function handleShowDescription () {
    console.log('show !', section.description)
  }

  function handleEditDescription () {
    console.log('edit !', section.id)
  }

  function handleDeleteDescription () {
    console.log('delete !', section.id)
  }

  return ( 
    <div className="project__section">
      <h2>
        <span className="title">
          { section.name }
        </span>
        <SectionActionBox 
          showDescription={handleShowDescription}
          editDescription={handleEditDescription}
          deleteDescription={handleDeleteDescription}
        />
      </h2>

    </div>
  );
}
 
export default Section