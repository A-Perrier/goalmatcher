import React, { useState } from 'react';
import { Check, Cross, Flag } from '../../../../components/Svg';
import { DefaultUser } from '../../../../components/UserIcon';
import { PRIORITY_HIGH, PRIORITY_LOW, PRIORITY_MEDIUM, COLOR_DANGER } from '../../../../helpers/const';
import { convertPriority } from '../../../../helpers/functions';
import { connect } from 'react-redux'
import ContributorBadge from '../ContributorBadge';

const TaskForm = ({ contributors, onSubmit, onCancel, nameValue = '', priorityValue = PRIORITY_LOW, assigneeValue = null }) => {
  const [showContributorList, setShowContributorList] = useState(false)
  const [name, setName] = useState(nameValue)
  const [assignee, setAssignee] = useState(assigneeValue)
  const [priority, setPriority] = useState(priorityValue)
  
  function handlePriorityChange () {
    switch (priority) {
      case PRIORITY_LOW: setPriority(PRIORITY_MEDIUM); break
      case PRIORITY_MEDIUM: setPriority(PRIORITY_HIGH); break
      case PRIORITY_HIGH: setPriority(PRIORITY_LOW); break
    }
  }

  function handleContributorChoice (name) {
    setAssignee(name)
    setShowContributorList(false)
  }

  return ( 
    <div className="task" style={{ marginTop: '.5rem' }}>
      <span className="task__cube"></span>
      <input 
        className="task__editable-input" 
        type="text" 
        placeholder="Donnez un nom à la tâche" 
        value={name} 
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <span className="task__editable-assignee" onClick={() => { setShowContributorList(!showContributorList) }}>
        { 
          !assignee ?
          <DefaultUser />
          :
          <ContributorBadge username={assignee} />
        }
      </span>
      {
        showContributorList &&
        <ul class="task__contributors-box">
          <li class="contributor" onClick={(e) => handleContributorChoice(null)} style={{color: COLOR_DANGER}}>Retirer l'assignation</li>
          { contributors.map((contributor, i) => 
          <li class="contributor" key={i} onClick={(e) => handleContributorChoice(contributor.pseudo)}>{contributor.pseudo}</li>) }
        </ul>
      }
      <span className="task__editable-priority" onClick={handlePriorityChange}>
        <Flag fill={ convertPriority(priority, false, true)} />
      </span>
      <div class="contenteditable-actions">
        <Cross onClick={ onCancel } className="clickable contenteditable__cross" />
        <Check onClick={ (e) => onSubmit ({ name, assignee, priority }) } className="clickable contenteditable__check" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contributors: state.manageProject.contributors
  }
}

export default connect(mapStateToProps)(TaskForm);