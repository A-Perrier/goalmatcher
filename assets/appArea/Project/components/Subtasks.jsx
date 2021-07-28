import React from 'react';
import { Plus } from '../../../components/Svg';

const Subtasks = ({ subtasks }) => {
  return ( 
    <div class="modal__subtasks-block">
      <h2>
        <span class="title">
          Sous-objectifs
        </span>
        <Plus />
      </h2>
        <ul class="subtasks__group">
        { subtasks.length > 0 ?
          subtasks.map(subtask => 
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
  );
}
 
export default Subtasks;