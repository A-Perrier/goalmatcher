import React, { useState } from 'react';
import { create } from '../../services/Api/Tasklist';
import { connect } from 'react-redux';
import NewTasklistActionBox from '../ActionBox/NewTasklistActionBox';
import TasklistForm from '../Form/TasklistForm';

const NewTasklistHandler = ({ section, dispatch }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  
  async function handleCreation(data) {
    const tasklist = await create({ name: data, sectionId: section.id })
    // On va dispatcher la tasklist quand on aura géré l'affichage de celles-ci depuis la BDD
  }

  return ( 
    <div class="project__create-tasklist">
      <h4>
        {
          !isFormVisible ?
          <>
          <span class="title">
            Nouvelle liste
          </span>
          <NewTasklistActionBox onCreate={() => { setIsFormVisible(!isFormVisible) }} />
          </>
          :
          <TasklistForm
            onSubmit={(data) => handleCreation(data)} 
            onCancel={() => setIsFormVisible(false)} 
            />
        }
      </h4>
    </div>
  );
}
 

const mapStateToProps = (state) => {
  return {}
}


export default connect(mapStateToProps)(NewTasklistHandler);