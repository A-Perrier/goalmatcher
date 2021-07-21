import React, { useState } from 'react';
import { connect } from 'react-redux'
import { TasklistActionsIcon } from '../../../../components/Svg';

const TasklistActionBox = ({ 
  onEdit,
  onRemove
 }) => {
  const [isVisible, setIsVisible] = useState(false)

  return ( 
  <>
    <TasklistActionsIcon onClick={() => setIsVisible(!isVisible)} />
    { isVisible &&
    <div class="clickable-actions">
      <a onClick={() => { onEdit(); setIsVisible(false) }}>Modifier la liste</a>
      <a onClick={() => { onRemove(); setIsVisible(false) }}>Supprimer la liste</a>
    </div>
    }
  </> );
}

const mapStateToProps = (state) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}


export default connect(mapStateToProps)(TasklistActionBox);