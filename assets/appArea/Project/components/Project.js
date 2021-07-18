import React from 'react';
import './Project.scss'
import { connect } from 'react-redux';

const Project = (props) => {
  console.log(props)
  return ( 
    <h1>Projet</h1>
  );
}

const mapStateToProps = (state) => {
  return {
    projectId: state.projectId
  }
}

export default connect(mapStateToProps)(Project);

