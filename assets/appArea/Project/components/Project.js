import React, { useEffect, useState } from 'react';
import './Project.scss'
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { find } from '../services/Api/Project';
import { PROJECT_INITIALIZATION, TRANSPORT_DATA } from '../Reducers/projectReducer';
import ProjectTitle from './ProjectTitle';
import ProjectBody from './ProjectBody';
import { SectionModal, TaskModal } from './ModalContent';
import { MODAL_CLOSE } from '../Reducers/modalReducer';

const Project = ({ 
  id, 
  dispatch, 
  project, 
  isCreator, 
  isModalVisible, 
  modalData,
  modalComponent
  }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { name, status, createdAt, deadline, description, contributors } = project
  
  async function fetchProject () {
    const { project, isCreator } = await find(id, name)
    setIsLoading(false)

    const action = { type: PROJECT_INITIALIZATION, value: { project, isCreator } }
    dispatch(action)
  } 



  useEffect(() => {
    fetchProject()
  }, [])



  return (
   isLoading && <Loader speed="150" /> ||
  <>
    <ProjectTitle data={{ name, status, createdAt, deadline, description, contributors }} />
    <ProjectBody sections={ project.sections }/>

    {
      // On gère l'affichage des modales depuis le composant principal pour pouvoir interagir dedans
      isModalVisible && modalComponent === 'task' &&
      <TaskModal 
        task={modalData} 
        isCreator={isCreator}
        onDelete={() => dispatch({ type: TRANSPORT_DATA, value: { type: 'DELETE_TASK', data: modalData }})}
        onEdit={(task, updData) => dispatch({ type: TRANSPORT_DATA, value: { type: 'EDIT_TASK', data: { task, updData } }})}
        onRequestClose={() => dispatch({ type: MODAL_CLOSE })}
        dispatch={dispatch}
      />
    ||
      isModalVisible && modalComponent === 'section' &&
      <SectionModal content={modalData} onRequestClose={() => dispatch({ type: MODAL_CLOSE })} />
    }
  </>
    
  );
}

const mapStateToProps = (state) => {
  return {
    projectId: state.manageProject.projectId,
    project: state.manageProject.project,
    isCreator: state.manageProject.isCreator,

    isModalVisible: state.manageModal.isModalVisible,
    modalData: state.manageModal.data,
    modalComponent: state.manageModal.component
  }
}

export default connect(mapStateToProps)(Project);

