import React from 'react';
import { connect } from 'react-redux'
import { Flag } from '../../../components/Svg';
import { UserIcon, DefaultUser } from '../../../components/UserIcon';
import { convertPriority } from '../../../helpers/functions';
import { MODAL_SHOW } from '../Reducers/modalReducer';
import { TaskModal } from './ModalContent';

const Task = ({ task, tasklist, isCreator, dispatch }) => {

  function handleShowDetails () {
    const action = { type: MODAL_SHOW, value: <TaskModal task={task} isCreator={isCreator} /> }
    dispatch(action)
  }

  return ( 
    <div className="task" onClick={handleShowDetails}>
      <span class="task__cube"></span>
      <p class="task__name">{ task.name }</p>
      <span class="task__assignee">
      { task.assignee.length > 0 ?
        <UserIcon user={task.assignee[0]} />
      :
        <DefaultUser />
      }
      </span>
      <span class="task__editable-priority">
        <Flag fill={ convertPriority(task.priority, false, true)} />
      </span>
    </div>
  );
}
 

const mapStateToProps = ( state ) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}

export default connect(mapStateToProps)(Task);


/**
 * <div class="task" tasklist="{{tasklist.id}}" task="{{task.id}}" order="{{task.listOrder}}">
                {# On va vouloir créer une modale qui reprend toutes les infos et permet d'éditer en tant que créateur #}
                <div class="modal-content">
                  <h1>
                    <span class="title">
                      {{task.name}}
                    </span>
                    {% if userRole == 'creator' %}
                    <img class="task__edit-icon" src="/assets/icons/edit.svg" onclick="onEditTaskClick();">
                    {% endif %}  
                  </h1>
                  <div class="modal__description-block">
                    {% if task.description %}
                    <p class="task__description">{{task.description|raw}}</p>
                    {% else %}
                    <p class="unavailable task__description">Aucune description disponible</p>
                    {% endif %}
                  </div>
                  <div class="modal__flex-group">
                    <div class="modal__information-block">
                      <div class="project-context">
                        <div style="display:flex;margin:auto;">
                          <div class="project-context__data" style="position:relative;">
                            <p class="placeholder">Attribué à</p>
                            {% if task.assignee.values %}
                              <p class="pseudo">{{ task.assignee.values[0].pseudo }}</p>
                            {% else %}
                              <p class="unavailable pseudo">Personne</p>
                            {% endif %}
                          </div>
                          <div class="project-context__data">
                            <p class="placeholder">Démarré le</p>
                            <p class="content">{{task.submittedAt|date('d/m/Y')}}</p>
                          </div>
                          <div class="project-context__data">
                            <p class="placeholder">Priorité</p>
                            <p class="content priority">{{task.priority|convert}}</p>
                          </div>
                        </div>
                      </div>
                      <input type="hidden" value="{{task.id}}">
                    {% if userRole == 'creator' %}
                      <button class="delete-btn task-delete" task="{{task.id}}" onclick="onDeleteTaskClick();">Supprimer cette tâche</button>
                    {% endif %}
                    </div>
                    <div class="modal__subtasks-block">
                      <h2>
                        <span class="title">
                          Sous-objectifs
                        </span>
                        <img class="clickable" src="/assets/icons/plus.svg" onclick="toggleSubtaskPanel();">
                      </h2>
                        <ul class="subtasks__group">
                        {% if task.subtasks|length > 0 %}
                          {% for subtask in task.subtasks %}
                          <li class="subtask" subtask={{subtask.id}}>
                            {% include "_shared/svg/check.html.twig" with {color: boolToHEX(subtask.isCleared), userRole: userRole} %}
                            {{subtask.name}}
                          </li>
                          {% endfor %}
                        {% endif %}
                        </ul>
                      
                        {% if task.subtasks|length == 0 %}
                        <p class="unavailable">Aucun sous-objectif disponible</p>
                        {% endif %}
                        <p class="create-subtask" task={{task.id}} onclick="onCreateSubtaskClick();">+ Nouveau sous-objectif</p>
                    </div>
                    <div class="modal__documents-block">
                      <div class="document-list">
                      <h2>
                       <span class="title">
                          Documents
                       </span>
                       {% if userRole == 'creator' %}
                       <img class="clickable" src="/assets/icons/plus.svg">
                       <div class="clickable-actions">
                        <a role="action" onclick="getTaskDocumentForm();">Ajouter un document</a>
                        <a role="action" onclick="toggleDocumentsPanel();">Supprimer un document</a>
                       </div>
                       {% endif %}
                      </h2>
                      <div class="document-group">
                        {% for document in task.taskDocuments %}
                        <div class="document" tdoc="{{document.id}}" task={{task.id}}>
                          <span class="document-cube"></span>
                          <a href="{{'/assets/uploads/tasks/documents/' ~ document.document.name}}" target="_blank" class="document-name">{{
                            document.document.name|slice(0, 30) ~ '...' ~ 
                            document.document.name|slice((document.document.name|length - 4), (document.document.name|length))}}</a>
                        </div>
                        {% endfor %}
                      </div>
                      {% if task.taskDocuments|length == 0 %}
                      <p class="unavailable">Aucun document disponible</p>
                      {% endif %}
                      </div>
                    </div>
                  </div>
                </div>
                <span class="task__cube"></span>
                <p class="task__name" role="action" to="open-task-modal">{{task.name}}</p>
                <span class="task__assignee">
                {% if task.assignee.values %}
                  {% if getProfilePictureName(task.assignee.values[0]) %}
                  <img src="{{asset('/assets/uploads/users/picture/' ~ getProfilePictureName(task.assignee.values[0])) |imagine_filter('project_user_picture')}}" class="assignee-profile-picture" title="{{task.assignee.values[0].pseudo}}">
                  {% endif %}
                {% else %}
                  <img src="/assets/icons/user.svg" alt="" title=""/>
                {% endif %}
                </span>
                <span class="task__editable-priority">
                  {% include "_shared/svg/flag.html.twig" with {color: getHEXFromString(task.priority)} %}
                </span>
              </div>
 */