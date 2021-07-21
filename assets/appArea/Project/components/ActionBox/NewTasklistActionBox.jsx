import React, { useState } from 'react';
import { Plus } from '../../../../components/Svg';

const NewTasklistActionBox = ({ onCreate }) => {
  const [isVisible, setIsVisible] = useState(false)

  function handleClick () {
    setIsVisible(false)
    onCreate()
  }

  return ( 
    <>
    <Plus onClick={ () => setIsVisible(!isVisible) }/>
    { isVisible &&
    <div class="clickable-actions">
        <a onClick={handleClick} class="create-tasklist">Créer une liste</a>
    </div>
    }
    </>
  );
}
 
export default NewTasklistActionBox;