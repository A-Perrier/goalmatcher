import React, { useState } from 'react';
import { Check, Cross } from '../../../../components/Svg';

const TasklistForm = ({ onSubmit, onCancel, titleValue = ''}) => {
  const [titleContent, setTitleContent] = useState(titleValue)

  return ( 
    <div class="contenteditable-container">
      <input 
      type="text" 
      class="contenteditable create-tasklist title" 
      placeholder="Nouvelle liste" 
      value={titleContent}
      onChange={(e) => { setTitleContent(e.currentTarget.value) }}
      />
      <div class="contenteditable-actions">
        <Cross onClick={ onCancel } className="clickable contenteditable__cross" />
        <Check onClick={ (e) => onSubmit (titleContent) } className="clickable contenteditable__check" />
      </div>
    </div>
  );
}
 
export default TasklistForm;