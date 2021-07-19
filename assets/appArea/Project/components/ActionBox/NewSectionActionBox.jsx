import React, { useState } from 'react';
import { Plus } from '../../../../components/Svg';

const NewSectionActionBox = ({ onCreate }) => {
  const [isVisible, setIsVisible] = useState(false)

  function handleClick () {
    setIsVisible(false)
    onCreate()
  }

  return ( 
    <>
    <Plus onClick={() => setIsVisible(!isVisible)}/>
    { isVisible &&
    <div class="clickable-actions">
        <a onClick={handleClick}>Créer une section</a>
    </div>
    }
    </>
  );
}
 
export default NewSectionActionBox;