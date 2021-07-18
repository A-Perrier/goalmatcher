import React, { useEffect, useState } from 'react';
import './Project.scss'
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { find } from '../services/Api/Project';
import { PROJECT_INITIALIZATION } from '../Reducers/projectReducer';

const Project = ({ id, dispatch, project }) => {
  const [isLoading, setIsLoading] = useState(true)

  async function fetchProject () {
    const project = await find(id, name)
    setIsLoading(false)

    const action = { type: PROJECT_INITIALIZATION, value: project }
    dispatch(action)
  } 

  useEffect(() => {
    fetchProject()
    
  }, [])

  return ( 
    <>
      {isLoading && <Loader speed="150" />}
      <h1>{ project.name }</h1>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    projectId: state.projectId,
    project: state.project
  }
}

export default connect(mapStateToProps)(Project);

