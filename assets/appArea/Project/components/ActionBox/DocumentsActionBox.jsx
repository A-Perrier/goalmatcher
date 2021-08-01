import React, { useState } from 'react'
import { Plus } from '../../../../components/Svg';
import { connect } from 'react-redux'

const DocumentsActionBox = ({ onAddRequest, onRemoveRequest, isCreator }) => {
  const [isVisible, setIsVisible] = useState(false)
  return ( 
    isCreator &&
    <>
      <Plus onClick={() => setIsVisible(!isVisible)}/>
      {
        isVisible &&
        <div class="clickable-actions">
          <a onClick={onAddRequest}>Ajouter un document</a>
          <a onClick={onRemoveRequest}>Supprimer un document</a>
        </div>
      }
    </> 
  );
}

const mapStateToProps = (state) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}


export default connect(mapStateToProps)(DocumentsActionBox);