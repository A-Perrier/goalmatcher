import React, { useState } from 'react';
import { Infobulle } from '../../../components/Svg';
import ProjectDetails from './ProjectDetails';

const ProjectTitle = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false)
  const { name, status, createdAt, deadline, description, contributors } = data
  
  return (
    <h1 class="info-block">
      { name }
      <Infobulle onClick={() => { setShowDetails(!showDetails) }}/> 
      <ProjectDetails visible={showDetails} data={{ status, createdAt, deadline, description, contributors }}/>
    </h1>
  );
}
 
export default ProjectTitle;