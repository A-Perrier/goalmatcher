import React, { useState } from 'react';
import { Plus, SubtaskCheck } from '../../../components/Svg';
import { connect } from 'react-redux';
import { COLOR_DISABLE, COLOR_SUCCESS } from '../../../helpers/const';
import Subtask from './Subtask';
import { check, create, edit, remove } from '../services/Api/Subtask';
import { addToArray, editFromArray, removeFromArray } from '../../../helpers/functions';
import NewSubtaskHandler from './Creators/NewSubtaskHandler';

const Subtasks = ({ task, reduxSubtasks, isCreator, dispatch }) => {
  const [subtasks, setSubtasks] = useState(reduxSubtasks)
  const [actionsDisplayed, setActionsDisplayed] = useState(false)


  async function handleCreate(subtaskName) {
    const { subtask, status } = await create({name: subtaskName, taskId: task.id});
    if (status === 201) setSubtasks(addToArray(subtasks, subtask))
  }


  async function handleCheck(subtask) {
    const { updSubtask, status } = await check(subtask, subtask.id)
    if (status === 200) setSubtasks(editFromArray(subtasks, updSubtask, subtask))
  }


  async function handleEdit(subtask, data) {
    console.log(subtask, data)
    const { updSubtask, status } = await edit(data, subtask.id)
    if (status === 200) setSubtasks(editFromArray(subtasks, updSubtask, subtask))
  }


  async function handleDelete(subtask) {
    // On enlève du DOM d'abord pour une meilleure réactivité
    setSubtasks(removeFromArray(subtasks, subtask))
    await remove(subtask.id)
  }


  
  return ( 
    <div class="modal__subtasks-block">
      <h2>
        <span class="title">
          Sous-objectifs
        </span>
        <Plus onClick={() => setActionsDisplayed(!actionsDisplayed)} />
      </h2>
        <ul class="subtasks__group">
        { subtasks.length > 0 ?
          subtasks.map(subtask => 
            <Subtask 
              subtask={subtask} 
              onCheck={(subtask) => handleCheck(subtask)}
              onEdit={(subtask, data) => handleEdit(subtask, data)}
              onDelete={(subtask) => handleDelete(subtask)}
              actionsVisible={actionsDisplayed}
            />
          )
          :
            <p className="unavailable">Aucun sous-objectif disponible</p>
        }
        </ul>
        <NewSubtaskHandler
          onCreate={(subtask) => handleCreate(subtask)}
        />
    </div>
  );
}
 

const mapStateToProps = ( state ) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}
export default connect(mapStateToProps)(Subtasks);