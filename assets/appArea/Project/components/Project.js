import React, { useState } from 'react';
import './Project.scss'
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';

const Project = ({ name, id }) => {
  const [isLoading, setIsLoading] = useState(true)

  return ( 
    <>
      {isLoading && <Loader />}
      <h1>{ name }</h1>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    projectId: state.projectId
  }
}

export default connect(mapStateToProps)(Project);

