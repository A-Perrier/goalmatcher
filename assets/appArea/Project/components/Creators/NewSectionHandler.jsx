import React, { useState } from 'react';
import NewSectionActionBox from '../ActionBox/NewSectionActionBox';
import { create } from '../../services/Api/Section';
import { connect } from 'react-redux';
import { SECTION_CREATE } from '../../Reducers/projectReducer';
import SectionForm from '../Form/SectionForm';

const NewSectionHandler = ({ projectId, dispatch }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)


  async function handleCreation ({ name, description }) {
    setIsFormVisible(false)

    const section = await create({ name, description, projectId })

    const action = { type: SECTION_CREATE, value: section }
    dispatch(action)
  }


  return ( 
    <div class="project__create-section">
      <h2>
        {
          !isFormVisible ?
          <>
          <span class="title">
            Nouvelle section
          </span> 
          <NewSectionActionBox onCreate={() => { setIsFormVisible(!isFormVisible) }}/>
          </>
          :
          <SectionForm 
            onSubmit={(data) => handleCreation(data)} 
            onCancel={() => setIsFormVisible(false)}
          />
        }
      </h2>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    projectId: state.manageProject.projectId
  }
}

export default connect(mapStateToProps)(NewSectionHandler)