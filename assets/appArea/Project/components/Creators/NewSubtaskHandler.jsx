import React, { useState } from 'react';
import { Check, Cross } from '../../../../components/Svg';

const NewSubtaskHandler = ({ onCreate }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [name, setName] = useState('')

  return ( 
    !isFormVisible ?
      <p class="create-subtask" onClick={() => setIsFormVisible(true)}>+ Nouveau sous-objectif</p>
    :
      <>
      <input 
        type="text"
        className="subtask-input"
        placeholder="Nom de l'objectif"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Cross onClick={() => setIsFormVisible(false)}/>
      <Check onClick={() => { setIsFormVisible(false); onCreate(name) }}/>
      </>
  );
}
 
export default NewSubtaskHandler;