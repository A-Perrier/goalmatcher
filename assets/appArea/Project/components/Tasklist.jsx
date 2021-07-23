import React, { useState } from 'react';
import { connect } from 'react-redux'
import { edit } from '../services/Api/Tasklist';
import TasklistActionBox from './ActionBox/TasklistActionBox';
import TasklistForm from './Form/TasklistForm';

const Tasklist = ({ tasklist, dispatch, isCreator }) => {
  const [isEditing, setIsEditing] = useState(false)
 
  function startEditing () {
    setIsEditing(true)
  }


  /**
   * Needs to recieve for now only the tasklist name
   * @param {String} data 
   */
  async function handleEdit(data) {
    const { updTasklist, status } = await edit(data, tasklist.id)
  }



  function handleRemove () {
    //
    console.log('remove')
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
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}

export default connect(mapStateToProps)(Tasklist);