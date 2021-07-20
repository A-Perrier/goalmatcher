import React from 'react';
import { remove } from '../services/Api/Section';
import { connect } from 'react-redux'
import SectionActionBox from './ActionBox/SectionActionBox';
import { SECTION_REMOVE } from '../Reducers/projectReducer';

const Section = ({ section, dispatch }) => {
  
  function handleShowDescription () {
    console.log('show !', section.description)
  }

  function handleEditDescription () {
    console.log('edit !', section.id)
  }

  async function handleDeleteDescription () {
    const status = await remove(section.id)
    
    if ( status === 200 ) {
      const action = { type: SECTION_REMOVE, value: section }
      dispatch(action)
    }
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
 

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Section)