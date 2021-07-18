import React from 'react';
import Project from './components/Project';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

const ProjectContainer = () => {
  return ( 
  <Provider store={Store}>
    <Project />
  </Provider>
  );
}
 
export default ProjectContainer;