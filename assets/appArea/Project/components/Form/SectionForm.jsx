import React, { useState } from 'react';
import { Check, Cross } from '../../../../components/Svg';

const SectionForm = ({ onSubmit, onCancel, titleValue = '', descriptionValue = '' }) => {
  const [titleContent, setTitleContent] = useState(titleValue)
  const [descriptionContent, setDescriptionContent] = useState(descriptionValue)


  return ( 
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
        <Cross onClick={ onCancel }/>
        <Check onClick={ (e) => onSubmit ({ name: titleContent, description: descriptionContent }) }/>
      </div>
    </div>
   );
}
 
export default SectionForm;