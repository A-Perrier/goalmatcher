import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { addToArray, sortByListOrder } from '../../../helpers/functions';
import { TASKLIST_EDIT, TASKLIST_REMOVE } from '../Reducers/projectReducer';
import { edit, remove } from '../services/Api/Tasklist';
import TasklistActionBox from './ActionBox/TasklistActionBox';
import NewTaskHandler from './Creators/NewTaskHandler';
import TasklistForm from './Form/TasklistForm';
import Task from './Task';

const Tasklist = ({ tasklist, section, dispatch, isCreator, itemTransported }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [reorganizedTasks, setReorganizedTasks] = useState(sortByListOrder(tasklist.tasks))
 
  useEffect(() => {
    const {type, data} = itemTransported
    if (type === 'DELETE_TASK') {
      handleTaskDelete(data)
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
      console.log('tasklist.jsx', tasklist)
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


  async function handleTaskDelete (task) {
    console.log('delete !', task)
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