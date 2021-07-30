import React, { useState } from 'react';
import { EditIcon, Plus } from '../../../components/Svg';
import Documents from './Documents';
import Subtasks from './Subtasks';
import TaskContext from './TaskContext';
import TaskDescription from './TaskDescription';
import TaskFormModal from './Form/TaskFormModal';
import { edit } from '../services/Api/Task';
import { TRANSPORT_DATA } from '../Reducers/projectReducer';

const Modal = ({ onRequestClose, children }) => {
  return (
    <>
    <div id="body-cover"></div>
    <div class="modal__box">
      <img class="modal__close" src="/assets/icons/cross.svg" onClick={onRequestClose} />
      <div class="modal__content">
        <span className="modal-content">
          { children }
        </span>
      </div>
    </div>
    </>
  )
}



export const SectionModal = ({ content, onRequestClose }) => {
  return (
    <Modal onRequestClose={onRequestClose}>    
      <h3>Informations sur la section</h3>
      <p className="modal-content__editable">{ content }</p>
    </Modal>
  );
}
 


export const TaskModal = ({ task, isCreator, onRequestClose, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  
  async function handleEdition (updData) {
    setIsEditing(false)
    onEdit(task, updData)
    // On reçoit correctement la task modifiée. On va devoir :
    // 2. Faire transiter la task via Redux::TRANSPORT_DATA jusqu'à Tasklist.jsx
    // 3. On crééra un nouveau useEffect pour gérer la mise à jour de la liste
    // 4. On va prier pour que la modale se mette à jour par la même occasion sinon on le fera manuellement dans ce composant
    // via des states intermédiaires
  }

  return (
    <Modal onRequestClose={onRequestClose}>
      {
        !isEditing &&
        <>
        <h1>
          <span className="title">
            { task.name }
          </span>
          { isCreator &&
          <EditIcon className="task__edit-icon clickable" onClick={() => setIsEditing(true)} />
          }  
        </h1>
        <TaskDescription content={task.description} />
        <div className="modal__flex-group">
          <div className="modal__information-block">
            <TaskContext task={task} />
            { 
              isCreator && !isEditing &&
              <button class="delete-btn task-delete" onClick={onDelete}>Supprimer cette tâche</button>
            }
          </div>
          <Subtasks subtasks={task.subtasks} />
          <Documents documents={task.taskDocuments} isCreator={isCreator} />
        </div>
        </>
        ||
        <TaskFormModal 
          onCancel={() => setIsEditing(false)}
          onSubmit={(data) => handleEdition (data)}
          task={task}
        />
      }  
    </Modal>
  )
}