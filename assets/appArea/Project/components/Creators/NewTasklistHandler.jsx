import React, { useState } from 'react';
import NewTasklistActionBox from '../ActionBox/NewTasklistActionBox';
import TasklistForm from '../Form/TasklistForm';

const NewTasklistHandler = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  function handleCreation(data) {
    console.log(data)
  }

  return ( 
    <div class="project__create-tasklist">
      <h4>
        {
          !isFormVisible ?
          <>
          <span class="title">
            Nouvelle liste
          </span>
          <NewTasklistActionBox onCreate={() => { setIsFormVisible(!isFormVisible) }} />
          </>
          :
          <TasklistForm
            onSubmit={(data) => handleCreation(data)} 
            onCancel={() => setIsFormVisible(false)} 
            />
        }
      </h4>
    </div>
  );
}
 
export default NewTasklistHandler;