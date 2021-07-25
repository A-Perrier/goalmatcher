import React, { useState } from 'react';
import { edit, remove } from '../services/Api/Section';
import { connect } from 'react-redux'
import SectionActionBox from './ActionBox/SectionActionBox';
import { SECTION_EDIT, SECTION_REMOVE } from '../Reducers/projectReducer';
import SectionForm from './Form/SectionForm';
import { MODAL_SHOW } from '../Reducers/modalReducer';
import { SectionModal } from './ModalContent';
import NewTasklistHandler from './Creators/NewTasklistHandler';
import Tasklist from './Tasklist';
import { sortByListOrder } from '../../../helpers/functions';

const Section = ({ section, dispatch, isCreator }) => {
  const [isEditing, setIsEditing] = useState(false)
  const reorganizedTasklists = sortByListOrder(section.tasklists)

  
  function handleShowDescription () {
    const action = { type: MODAL_SHOW, value: <SectionModal content={section.description} /> }
    dispatch(action)
  }



  function startEditing () {
    setIsEditing(true)
  }



  async function handleEdit ({ name, description }) {
    const { updSection, status } = await edit({ name, description }, section.id)

    if ( status === 200 ) {
      setIsEditing(false)
      const action = { type: SECTION_EDIT, value: { updSection, oldSection: section } }
      dispatch(action)
    }
  }



  async function handleRemove () {
    const status = await remove(section.id)
    
    if ( status === 200 ) {
      const action = { type: SECTION_REMOVE, value: section }
      dispatch(action)
    }
  }



  return ( 
    <div className="project__section">
      <h2>
        {
          !isEditing ?
          <>
          <span className="title">
            { section.name }
          </span>
          <SectionActionBox 
            showDescription={handleShowDescription}
            onEdit={startEditing}
            onRemove={handleRemove}
          />
          </> 
          :
          <SectionForm 
            onCancel={() => setIsEditing(false) }
            onSubmit={(data) => handleEdit(data)}
            titleValue={section.name}
            descriptionValue={section.description}
          />
        }
      </h2>
      <div class="tasklists-container">
        { reorganizedTasklists.map((tasklist, index) => 
        <Tasklist key={index} tasklist={tasklist} section={section} />
        )}
      </div>


      { isCreator && <NewTasklistHandler section={section} /> }
    </div>
  );
}
 

const mapStateToProps = (state) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}

export default connect(mapStateToProps)(Section)