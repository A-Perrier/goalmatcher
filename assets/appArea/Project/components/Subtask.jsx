import React, { useState } from 'react';
import { BasicCross, EditIcon, SubtaskCheck } from '../../../components/Svg';
import { connect } from 'react-redux';
import { COLOR_DISABLE, COLOR_SUCCESS } from '../../../helpers/const';

const Subtask = ({ subtask, onCheck, onDelete, actionsVisible, isCreator }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(subtask.name)

  return ( 
    <li class="subtask" subtask={ subtask.id }>
      <SubtaskCheck 
        onClick={isCreator ? (e) => onCheck(subtask) : null}
        fill={subtask.isCleared ? COLOR_SUCCESS : COLOR_DISABLE}
        isCreator={isCreator}
      />
      { name }
      { 
        actionsVisible &&
        <>
        <EditIcon className="subtask-option" onClick={() => setIsEditing(true)} />
        <BasicCross className="subtask-option" onClick={(e) => onDelete(subtask)} />
        </>
      }
    </li>
  );
}
 

const mapStateToProps = ( state ) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}
export default connect(mapStateToProps)(Subtask);