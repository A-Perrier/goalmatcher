import React from 'react';

const TaskDescription = ({ content = undefined }) => {
  return ( 
    <div className="modal__description-block">
      { content ?
      <p className="task__description" dangerouslySetInnerHTML={{ __html: content }} />
      :
      <p className="unavailable task__description">Aucune description disponible</p>
      }
    </div>
  );
}
 
export default TaskDescription;