import React, { useState } from 'react';
import { create } from '../../services/Api/Task';
import TaskForm from '../Form/TaskForm';

const NewTaskHandler = ({ tasklist, onCreate }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  async function handleCreation (data) {
    // On arrête de passer par redux car les boucles dans d'autres boucles rendent illisibles l'opération
    const task = await create({ ... data, tasklistId: tasklist.id })
    setIsFormVisible(false)
    onCreate(task)
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


export default NewTaskHandler;