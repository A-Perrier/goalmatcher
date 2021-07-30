import React, { useState } from 'react';
import { COLOR_DANGER, COLOR_SECONDARY, PRIORITY_HIGH, PRIORITY_HIGH_FR, PRIORITY_LOW, PRIORITY_LOW_FR, PRIORITY_MEDIUM, PRIORITY_MEDIUM_FR } from '../../../../helpers/const';
import { dateTimeToString } from '../../../../helpers/functions';
import ContributorBadge from '../ContributorBadge';
import ContributorsList from './ContributorsList';

const TaskContextForm = ({ assignee, priority, submittedAt, contributors, onAssigneeChange, onPriorityChange }) => {
  const [showContributorList, setShowContributorList] = useState(false)
  const [activeAssignee, setActiveAssignee] = useState(assignee)

  function handleAssigneeChange (data) {
    setShowContributorList(false)
    setActiveAssignee(data)
    onAssigneeChange(data)
  }

  return ( 
    <div className="project-context">
      <div style={{ display: 'flex', margin: 'auto', position: 'relative' }}>
        <div className="project-context__data" style={{ position: 'relative' }}>
          <p className="placeholder">Attribué à</p>
            <span onClick={() => setShowContributorList(!showContributorList)}>
            {
              activeAssignee ?
              <ContributorBadge username={activeAssignee} style={{cursor: 'pointer'}}/>
              :
              <p className="unavailable pseudo" style={{cursor:'pointer', color: COLOR_SECONDARY}}>Personne</p>
            }
            </span>
        </div>
        {
        showContributorList &&
          <ContributorsList contributors={contributors} onChoice={(data) => handleAssigneeChange(data)} styleType="taskModal" />
        }
        <div className="project-context__data">
          <p className="placeholder">Démarré le</p>
          <p className="content">{ dateTimeToString(submittedAt) }</p>
        </div>
        <div className="project-context__data">
          <p className="placeholder">Priorité</p>
          <select value={priority} onChange={(e) => onPriorityChange(e.currentTarget.value)}>
            <option value={PRIORITY_LOW}>{PRIORITY_LOW_FR}</option>
            <option value={PRIORITY_MEDIUM}>{PRIORITY_MEDIUM_FR}</option>
            <option value={PRIORITY_HIGH}>{PRIORITY_HIGH_FR}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
 
export default TaskContextForm;