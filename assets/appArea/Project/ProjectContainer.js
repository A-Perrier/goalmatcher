import React from 'react';
import Project from './components/Project';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import { location } from '../../helpers/functions';

const ProjectContainer = () => {
  return ( 
  <Provider store={Store}>
    <Project name={location.name} id={location.id} />
  </Provider>
  );
}
 
export default ProjectContainer;