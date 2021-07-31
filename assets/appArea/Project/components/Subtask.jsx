import React, { useState } from 'react';
import { BasicCross, Check, Cross, EditIcon, SubtaskCheck } from '../../../components/Svg';
import { connect } from 'react-redux';
import { COLOR_DISABLE, COLOR_SUCCESS } from '../../../helpers/const';

const Subtask = ({ subtask, onCheck, onEdit, onDelete, actionsVisible, isCreator }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(subtask.name)

  return ( 
    !isEditing ?
    <li class="subtask" subtask={ subtask.id }>
      <SubtaskCheck 
        onClick={isCreator ? (e) => onCheck(subtask) : null}
        fill={subtask.isCleared ? COLOR_SUCCESS : COLOR_DISABLE}
        isCreator={isCreator}
      />
      { subtask.name }
      { 
        actionsVisible &&
        <>
        <EditIcon className="subtask-option" onClick={() => setIsEditing(true)} />
        <BasicCross className="subtask-option" onClick={(e) => onDelete(subtask)} />
        </>
      }
    </li>
    :
    <>
      <input 
        type="text"
        className="subtask-input"
        placeholder="Nom de l'objectif"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Cross onClick={() => setIsEditing(false)}/>
      <Check onClick={() => { setIsEditing(false); onEdit(subtask, {...subtask, name}) }}/>
    </>
  );
}
 

const mapStateToProps = ( state ) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}
export default connect(mapStateToProps)(Subtask);