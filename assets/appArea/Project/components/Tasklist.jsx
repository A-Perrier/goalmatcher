import React from 'react';
import { connect } from 'react-redux'
import TasklistActionBox from './ActionBox/TasklistActionBox';

const Tasklist = ({ tasklist, dispatch, isCreator }) => {
 
  function startEditing () {
    //
    console.log('edit')
  }



  function handleRemove () {
    //
    console.log('remove')
  }

  return (
    <div class="project__tasklist" order={tasklist.listOrder}>
      <h4 class="project__tasklist-title" style={{ backgroundColor: '#284B76' }}>
            <span class="title">
              {tasklist.name}
            </span>
            { isCreator && 
              <TasklistActionBox 
                onEdit={startEditing}
                onRemove={handleRemove}
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