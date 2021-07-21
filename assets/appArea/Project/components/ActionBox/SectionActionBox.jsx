import React, { useState } from 'react';
import { Plus } from '../../../../components/Svg';
import { connect } from 'react-redux';

const SectionActionBox = ({ 
  isCreator,
  showDescription,
  onEdit,
  onRemove
}) => {
  const [isVisible, setIsVisible] = useState(false)

  return ( 
    <>
      <Plus onClick={() => { setIsVisible(!isVisible) }} />
      {
        isVisible &&
        <div class="clickable-actions">
          <a onClick={showDescription}>Informations sur la section</a>
          {
          isCreator &&
          <>
          <a onClick={() => { onEdit(); setIsVisible(false) }}>Modifier la section</a>
          <a onClick={() => { onRemove(); setIsVisible(false) } }>Supprimer la section</a>
          </>
          }
        </div>
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isCreator: state.isCreator
  }
}

export default connect(mapStateToProps)(SectionActionBox);