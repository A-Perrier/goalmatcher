import React from 'react';
import { Plus, SubtaskCheck } from '../../../components/Svg';
import { connect } from 'react-redux';
import { COLOR_DISABLE, COLOR_SUCCESS } from '../../../helpers/const';

const Subtasks = ({ subtasks, isCreator, dispatch }) => {
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
              <SubtaskCheck 
                onClick={() => console.log('cliqué')}  
                fill={subtask.isCleared ? COLOR_SUCCESS : COLOR_DISABLE}
                isCreator={isCreator}
              />
              { subtask.name }
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
 

const mapStateToProps = ( state ) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}
export default connect(mapStateToProps)(Subtasks);