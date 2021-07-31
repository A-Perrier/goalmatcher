import React from 'react';
import { connect } from 'react-redux'
import { Flag } from '../../../components/Svg';
import { UserIcon, DefaultUser } from '../../../components/UserIcon';
import { convertPriority } from '../../../helpers/functions';
import { MODAL_SHOW } from '../Reducers/modalReducer';

const Task = ({ task, dispatch }) => {
 
  function handleShowDetails () {
    const action = { type: MODAL_SHOW, value: {component: 'task', data: task} }
    dispatch(action)
  }

  return ( 
    <div className="task" onClick={handleShowDetails}>
      <span class="task__cube"></span>
      <p class="task__name">{ task.name }</p>
      <span class="task__assignee">
      { task.assignee.length > 0 ?
        <UserIcon user={task.assignee[0]} />
      :
        <DefaultUser />
      }
      </span>
      <span class="task__editable-priority">
        <Flag fill={ convertPriority(task.priority, false, true)} />
      </span>
    </div>
  );
}
 

const mapStateToProps = ( state ) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}

export default connect(mapStateToProps)(Task);