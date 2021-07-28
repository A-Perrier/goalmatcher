import React from 'react';
import { EditIcon, Plus } from '../../../components/Svg';
import { convertPriority, dateTimeToString } from '../../../helpers/functions'
import Documents from './Documents';
import Subtasks from './Subtasks';
import TaskContext from './TaskContext';
import TaskDescription from './TaskDescription';


export const SectionModal = ({ content }) => {
  return ( 
    <span className="modal-content">
      <h3>Informations sur la section</h3>
      <p className="modal-content__editable">{ content }</p>
    </span>
  );
}
 

export const TaskModal = ({ task, isCreator }) => {
  return (
    <div className="modal-content">
      <h1>
        <span className="title">
          { task.name }
        </span>
        { isCreator &&
        <EditIcon className="task__edit-icon clickable" />
        }  
      </h1>
      <TaskDescription content={task.description} />
      <div className="modal__flex-group">
        <div className="modal__information-block">
          <TaskContext task={task} />
          { 
            isCreator &&
            <button class="delete-btn task-delete">Supprimer cette tâche</button>
          }
        </div>
        <Subtasks subtasks={task.subtasks} />
        <Documents documents={task.taskDocuments} isCreator={isCreator} />
      </div>
    </div>
  )
}