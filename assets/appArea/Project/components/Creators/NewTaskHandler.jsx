import React, { useState } from 'react';
import { connect } from 'react-redux'
import { create } from '../../services/Api/Task';
import TaskForm from '../Form/TaskForm';

const NewTaskHandler = ({ tasklist, dispatch }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  async function handleCreation (data) {
    const task = await create({ ... data, tasklistId: tasklist.id })
    console.log(task)
  }

  return ( 
    <div className="project__create-task">
      <h5 onClick={ () => setIsFormVisible(!isFormVisible) }>
        { !isFormVisible &&
          <>
          Nouvelle tâche
          <span className="plus">+</span>
          </>
        }
      </h5>

      {
        isFormVisible &&
        <TaskForm 
          onCancel={() => setIsFormVisible(false)} 
          onSubmit={(data) => handleCreation(data)}
        />
      }
    </div>
  );
}


const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(NewTaskHandler);