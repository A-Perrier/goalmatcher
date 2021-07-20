import React, { useState } from 'react';
import NewSectionActionBox from '../ActionBox/NewSectionActionBox';
import { Cross, Check } from '../../../../components/Svg';
import { create } from '../../services/Api/Section';
import { connect } from 'react-redux';
import { SECTION_CREATE } from '../../Reducers/projectReducer';

const NewSectionHandler = ({ projectId, dispatch }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [titleContent, setTitleContent] = useState('')
  const [descriptionContent, setDescriptionContent] = useState('')

  async function handleCreation () {
    setIsFormVisible(false)
    setTitleContent('')
    setDescriptionContent('')

    const section = await create({ name: titleContent, description: descriptionContent, projectId })

    const action = { type: SECTION_CREATE, value: section }
    dispatch(action)
  }


  return ( 
    <div class="project__create-section">
      <h2>
        {
          !isFormVisible ?
          <>
          <span class="title">
            Nouvelle section
          </span> 
          <NewSectionActionBox onCreate={() => { setIsFormVisible(!isFormVisible) }}/>
          </>
          :
          <div class="contenteditable-container">
            <input 
              type="text" 
              class="contenteditable create-section title" 
              placeholder="Nouvelle section" 
              value={titleContent}
              onChange={(e) => { setTitleContent(e.currentTarget.value) }}
            />
            <textarea 
              class="contenteditable create-section description" 
              placeholder="Description"
              value={ descriptionContent }
              onChange={(e) => { setDescriptionContent(e.currentTarget.value) }}
            />
            <div class="contenteditable-actions">
              <Cross onClick={ () => setIsFormVisible (false) }/>
              <Check onClick={ () => handleCreation () }/>
            </div>
          </div>
        }
      </h2>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    projectId: state.projectId
  }
}

export default connect(mapStateToProps)(NewSectionHandler)