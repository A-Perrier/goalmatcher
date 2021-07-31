import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Plus } from '../../../components/Svg';

const Documents = ({ reduxDocuments, isCreator }) => {
  const [documents, setDocuments] = useState(reduxDocuments)
  console.log(documents)

  return ( 
    <div class="modal__documents-block">
      <div class="document-list">
      <h2>
      <span class="title">
          Documents
      </span>
      { isCreator &&
      <>
      <Plus />
      <div class="clickable-actions">
        <a role="action" onclick="getTaskDocumentForm();">Ajouter un document</a>
        <a role="action" onclick="toggleDocumentsPanel();">Supprimer un document</a>
      </div>
      </>
      }
      </h2>
      <div class="document-group">
        { documents.length > 0 ?
          documents?.map(document => 
            {/* <div class="document">
              <span class="document-cube"></span>
              <a href="{{'/assets/uploads/tasks/documents/' ~ document.document.name}}" target="_blank" class="document-name">{
                document.document?.name.substring(0, 30) + '...' + 
                document.document?.name.substring((document.document.name.length - 4), (document.document.name.length))}</a>
            </div> */},
            <p>On doit gérer les documents</p>
          )
          :
          <p class="unavailable">Aucun document disponible</p>
        }
      </div>
      </div>
    </div>
  );
}
 

const mapStateToProps = ( state ) => {
  return {
    isCreator: state.manageProject.isCreator
  }
}

export default connect(mapStateToProps)(Documents);