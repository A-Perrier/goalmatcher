import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { addToArray, editFromArray, removeFromArray, sortByListOrder } from '../../../helpers/functions';
import { TASKLIST_EDIT, TASKLIST_REMOVE, TRANSPORT_DATA } from '../Reducers/projectReducer';
import { edit, remove } from '../services/Api/Tasklist';
import { remove as removeTask, edit as editTask } from '../services/Api/Task';
import TasklistActionBox from './ActionBox/TasklistActionBox';
import NewTaskHandler from './Creators/NewTaskHandler';
import TasklistForm from './Form/TasklistForm';
import Task from './Task';
import { MODAL_CLOSE, MODAL_SHOW } from '../Reducers/modalReducer';

const Tasklist = ({ tasklist, section, dispatch, isCreator, itemTransported }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [reorganizedTasks, setReorganizedTasks] = useState(sortByListOrder(tasklist.tasks))
 
  useEffect(() => {
    const { type, data } = itemTransported
    if (type === 'EDIT_TASK' && tasklist.tasks.some(task => task.id === data.task.id)) {
      // Puisque les tasks modifiées ne sont plus synchro avec le state de Redux (choix d'éviter les deep nested loops)
      // on vérifie la présence par l'ID
      handleTaskEdit(data.task, data.updData)
    }
    if (type === 'DELETE_TASK' && tasklist.tasks.includes(data)) {
      handleTaskRemove(data)
    }
  }, [itemTransported])

  

  function startEditing () {
    setIsEditing(true)
  }



  /**
   * Needs to recieve for now only the tasklist name
   * @param {String} data 
   */
  async function handleEdit(data) {
    const { updTasklist, status } = await edit(data, tasklist.id)

    if ( status === 200 ) {
      setIsEditing(false)
      const action = { type: TASKLIST_EDIT, value: { updTasklist, oldTasklist: tasklist, section } }
      dispatch(action)
    }
  }



  async function handleRemove () {
    const status = await remove(tasklist.id)
    
    if ( status === 200 ) {
      const action = { type: TASKLIST_REMOVE, value: { tasklist, section } }
      dispatch(action)
    }
  }



  async function handleTaskEdit (task, updData) {
    const { updTask, status } = await editTask(updData, task.id)

    if ( status === 200 ) {
      setReorganizedTasks(editFromArray(reorganizedTasks, updTask, task))
      dispatch({ type: MODAL_SHOW, value: {component: 'task', data: updTask} }) // To refresh the already open modal content
    }
  }


  async function handleTaskRemove (task) {
    const status = await removeTask(task.id)

    if ( status === 200 ) {
      setReorganizedTasks(removeFromArray(reorganizedTasks, task))
      dispatch({ type: MODAL_CLOSE })
    }
  }

  return (
    <div class="project__tasklist" order={tasklist.listOrder}>
      <h4 class="project__tasklist-title" style={{ backgroundColor: '#284B76' }}>
        {!isEditing ?
        <>
          <span class="title">
            {tasklist.name}
          </span>
          { isCreator && 
            <TasklistActionBox 
              onEdit={startEditing}
              onRemove={handleRemove}
            />
          }
        </>
        :
        <TasklistForm
          onSubmit={(data) => handleEdit(data)}
          onCancel={() => setIsEditing(false)}
          titleValue={tasklist.name}
        />
        }
          </h4>

          <div className="task-block">
            <div className="task-container">
            { reorganizedTasks.map((task, index) => 
              <Task key={index} task={task} tasklist={tasklist} onDelete={(task) => handleTaskDelete(task) } />
            )}
            </div>
            {
              isCreator &&
              <NewTaskHandler 
                tasklist={tasklist} 
                onCreate={ (task) => setReorganizedTasks(addToArray(reorganizedTasks, task)) } />
            }
          </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    isCreator: state.manageProject.isCreator,
    itemTransported: state.manageProject.itemTransported
  }
}

export default connect(mapStateToProps)(Tasklist);