import React from 'react';
import { Plus } from '../../../components/Svg';
import { convertPriority, dateTimeToString } from '../../../helpers/functions'


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
        <img className="task__edit-icon" src="/assets/icons/edit.svg" />
        }  
      </h1>
      <div className="modal__description-block">
        { task.description ?
        <p className="task__description" dangerouslySetInnerHTML={{ __html: task.description }} />
        :
        <p className="unavailable task__description">Aucune description disponible</p>
        }
      </div>
      <div className="modal__flex-group">
        <div className="modal__information-block">
          <div className="project-context">
            <div style={{ display: 'flex', margin: 'auto' }}>
              <div className="project-context__data" style={{ position: 'relative' }}>
                <p className="placeholder">Attribué à</p>
                {
                  task.assignee.length > 0 ?
                  <p className="pseudo">{ task.assignee[0].pseudo }</p>
                  :
                  <p className="unavailable pseudo">Personne</p>
                }
              </div>
              <div class="project-context__data">
                <p class="placeholder">Démarré le</p>
                <p class="content">{ dateTimeToString(task.submittedAt) }</p>
              </div>
              <div class="project-context__data">
                <p class="placeholder">Priorité</p>
                <p class="content priority">{ convertPriority(task.priority) }</p>
              </div>
            </div>
          </div>
          { 
            isCreator &&
            <button class="delete-btn task-delete">Supprimer cette tâche</button>
          }
        </div>
        <div class="modal__subtasks-block">
          <h2>
            <span class="title">
              Sous-objectifs
            </span>
            <Plus />
          </h2>
            <ul class="subtasks__group">
            { task.subtasks.length > 0 ?
              task.subtasks.map(subtask => 
                <li class="subtask" subtask={ subtask.id }>
                { //% include "_shared/svg/check.html.twig" with {color: boolToHEX(subtask.isCleared), userRole: userRole} %}
                subtask.name }
                </li>
              )
              :
                <p className="unavailable">Aucun sous-objectif disponible</p>
            }
            </ul>
            <p class="create-subtask">+ Nouveau sous-objectif</p>
        </div>
        <div class="modal__documents-block">
          <div class="document-list">
          <h2>
          <span class="title">
              Documents
          </span>
          { isCreator &&
          <>
          <img class="clickable" src="/assets/icons/plus.svg" />
          <div class="clickable-actions">
            <a role="action" onclick="getTaskDocumentForm();">Ajouter un document</a>
            <a role="action" onclick="toggleDocumentsPanel();">Supprimer un document</a>
          </div>
          </>
          }
          </h2>
          <div class="document-group">
            { task.taskDocuments.length > 0 ?
              task.taskDocuments?.map(document => 
                {/* <div class="document">
                  <span class="document-cube"></span>
                  <a href="{{'/assets/uploads/tasks/documents/' ~ document.document.name}}" target="_blank" class="document-name">{
                    document.document?.name.substring(0, 30) + '...' + 
                    document.document?.name.substring((document.document.name.length - 4), (document.document.name.length))}</a>
                </div> */},
                <p>On doit gérer les documents</p>
              )
              :
              <p class="unavailable">Aucun document disponible</p>
            }
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}