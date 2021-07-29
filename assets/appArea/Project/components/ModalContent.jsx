import React, { useEffect } from 'react';
import { EditIcon, Plus } from '../../../components/Svg';
import { convertPriority, dateTimeToString } from '../../../helpers/functions'
import Documents from './Documents';
import Subtasks from './Subtasks';
import TaskContext from './TaskContext';
import TaskDescription from './TaskDescription';


export const SectionModal = ({ content, onRequestClose }) => {
  return (
    <>
    <div id="body-cover"></div>
    <div class="modal__box">
      <img class="modal__close" src="/assets/icons/cross.svg" onClick={onRequestClose} />
      <div class="modal__content">
        <span className="modal-content">
          <h3>Informations sur la section</h3>
          <p className="modal-content__editable">{ content }</p>
        </span>
      </div>
    </div>
    </>
  );
}
 

export const TaskModal = ({ task, isCreator, onRequestClose, onDelete }) => {

  return (
    <>
    <div id="body-cover"></div>
    <div className="modal__box">
      <img className="modal__close" src="/assets/icons/cross.svg" onClick={onRequestClose} />
      <div className="modal__content">
        <div className="modal-content">
          <h1>
            <span className="title">
              { task.name }
            </span>
            { isCreator &&
            <EditIcon className="task__edit-icon clickable" onClick={() => {console.log('test')}} />
            }  
          </h1>
          <TaskDescription content={task.description} />
          <div className="modal__flex-group">
            <div className="modal__information-block">
              <TaskContext task={task} />
              { 
                isCreator &&
                <button class="delete-btn task-delete" onClick={onDelete}>Supprimer cette tâche</button>
              }
            </div>
            <Subtasks subtasks={task.subtasks} />
            <Documents documents={task.taskDocuments} isCreator={isCreator} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}