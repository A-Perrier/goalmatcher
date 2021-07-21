import React, { useState } from 'react';
import { edit, remove } from '../services/Api/Section';
import { connect } from 'react-redux'
import SectionActionBox from './ActionBox/SectionActionBox';
import { SECTION_EDIT, SECTION_REMOVE } from '../Reducers/projectReducer';
import SectionForm from './Form/SectionForm';
import { MODAL_SHOW } from '../Reducers/modalReducer';
import { SectionModal } from './ModalContent';

const Section = ({ section, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  
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
      {
        isModalVisible &&
        <div class="modal">
          <div id="body-cover"></div>
          <div class="modal__box">
            <img class="modal__close" src="/assets/icons/cross.svg" />
            <div class="modal__content">
              
              { section.description }
              
            </div>
          </div>
        </div>
      }
    </div>
  );
}
 

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Section)