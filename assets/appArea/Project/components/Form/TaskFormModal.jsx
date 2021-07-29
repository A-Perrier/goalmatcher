import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Check, Cross } from '../../../../components/Svg';
import { connect } from 'react-redux'
import TaskContext from '../TaskContext';
import TaskContextForm from './TaskContextForm';

const TaskFormModal = ({ contributors, onSubmit, onCancel, task }) => {
  const { name, description, assignee, priority } = task
  const [updName, setUpdName] = useState(name)
  const [updDescription, setUpdDescription] = useState(description)
  const [updAssignee, setUpdAssignee] = useState(assignee)
  const [updPriority, setUpdPriority] = useState(priority)
  
  console.log(updAssignee)
  // ON VA VOULOIR AMELIORER LE RENDU VISUEL DE LA MODALE
  // CREER DE QUOI MODIFIER LE CONTRIBUTEUR ET LA PRIORITE
  
  
  return (
    <>
    <div class="contenteditable-actions">
      <Cross onClick={onCancel} />
      <Check onClick={onSubmit} />
    </div>
    <input 
      type="text" 
      placeholder="Nom de la tâche"
      className="task__name-editable"
      value={updName}
      onChange={(e) => setUpdName(e.currentTarget.value)}
    />
    <CKEditor 
      editor={ClassicEditor}
      data={updDescription}
      onChange={(e, editor) => { setUpdDescription(editor.getData()) }}
    />
    <div className="modal__flex-group">
      <div className="modal__information-block">
        <TaskContextForm 
          task={task} 
          contributors={contributors}
          onAssigneeChange={(data) => { setUpdAssignee(data) }}
          onPriorityChange={(data) => { setUpdPriority(data) }}
        />
      </div>
    </div>
    </>
  );
}
 

const mapStateToProps = ( state ) => {
  return {
    contributors: state.manageProject.contributors
  }
}
export default connect(mapStateToProps)(TaskFormModal);