import React from 'react';
import nl2br from 'react-nl2br';
import { dateTimeToString, getTranslatedStatus } from '../../../helpers/functions';
import ContributorBadge from './ContributorBadge';

const ProjectDetails = ({ visible, data }) => {
  const { status, createdAt, deadline, description, contributors } = data
  console.log()
  return (
    visible &&
    <div className="info-text">
      <div className="project-context">
        <div style={{ display: 'flex', margin: 'auto' }}>
          <div className="project-context__data">
            <p class="placeholder">Progression</p>
            <p class="content">{ getTranslatedStatus(status) }</p>
          </div>
          <div className="project-context__data">
            <p class="placeholder">Démarré le</p>
            <p class="content">{ dateTimeToString(createdAt) }</p>
          </div>
          <div className="project-context__data">
            <p class="placeholder">Date limite</p>
            <p class="content">{ dateTimeToString(deadline) }</p>
          </div>
        </div>
        <div class="project-context__contributors">
          <h2>Contributeur-ices</h2>
          <ul class="project-context__contributors-list">
            { contributors.map((contributor, index) => 
              <ContributorBadge username={contributor.pseudo} />
            )}
          </ul>
        </div>
        <div class="project-context__description">
        <h2>Description</h2>
          <p>{ nl2br(description) }</p>
        </div>
      </div>
    </div>
    || <></>
  );
}
 
export default ProjectDetails;