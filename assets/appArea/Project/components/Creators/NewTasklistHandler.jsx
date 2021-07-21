import React, { useState } from 'react';
import { create } from '../../services/Api/Tasklist';
import { connect } from 'react-redux';
import NewTasklistActionBox from '../ActionBox/NewTasklistActionBox';
import TasklistForm from '../Form/TasklistForm';
import { TASKLIST_CREATE } from '../../Reducers/projectReducer';

const NewTasklistHandler = ({ section, dispatch }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  
  async function handleCreation(data) {
    const tasklist = await create({ name: data, sectionId: section.id })
    const action = { type: TASKLIST_CREATE, value: { section, tasklist } }
    dispatch(action)
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
 

const mapStateToProps = (state) => {
  return {
    project: state.manageProject.project
  }
}


export default connect(mapStateToProps)(NewTasklistHandler);