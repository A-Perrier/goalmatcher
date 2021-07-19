import React, { useState } from 'react';
import NewSectionActionBox from '../ActionBox/NewSectionActionBox';
import { Cross, Check } from '../../../../components/Svg';

const NewSectionHandler = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [titleContent, setTitleContent] = useState('')
  const [descriptionContent, setDescriptionContent] = useState('')

  function handleCreation () {
    setIsFormVisible(false)
    setTitleContent('')
    setDescriptionContent('')

    console.log(titleContent)
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
 
export default NewSectionHandler;