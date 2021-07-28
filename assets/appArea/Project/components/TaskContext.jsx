import React from 'react';
import { convertPriority, dateTimeToString } from '../../../helpers/functions';

const TaskContext = ({ task }) => {
  return ( 
    <div className="project-context">
      <div style={{ display: 'flex', margin: 'auto' }}>
        <div className="project-context__data" style={{ position: 'relative' }}>
          <p className="placeholder">Attribué à</p>
          {
            task.assignee.length > 0 ?
            <p className="pseudo">{ task.assignee[0].pseudo }</p>
            :
            <p className="unavailable pseudo">Personne</p>
          }
        </div>
        <div className="project-context__data">
          <p className="placeholder">Démarré le</p>
          <p className="content">{ dateTimeToString(task.submittedAt) }</p>
        </div>
        <div className="project-context__data">
          <p className="placeholder">Priorité</p>
          <p className="content priority">{ convertPriority(task.priority) }</p>
        </div>
      </div>
  </div>
  );
}
 
export default TaskContext;