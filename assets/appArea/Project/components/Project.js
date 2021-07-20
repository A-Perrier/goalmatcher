import React, { useCallback, useEffect, useState } from 'react';
import './Project.scss'
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { find } from '../services/Api/Project';
import { PROJECT_INITIALIZATION } from '../Reducers/projectReducer';
import ProjectTitle from './ProjectTitle';
import ProjectBody from './ProjectBody';

const Project = ({ id, dispatch, project }) => {
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
  </>
    
  );
}

const mapStateToProps = (state) => {
  return {
    projectId: state.projectId,
    project: state.project,
    isCreator: state.isCreator
  }
}

export default connect(mapStateToProps)(Project);

