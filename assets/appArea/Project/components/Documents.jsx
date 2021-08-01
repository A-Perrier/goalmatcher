import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Plus } from '../../../components/Svg';
import { upload } from '../services/Api/Document';
import DocumentsActionBox from './ActionBox/DocumentsActionBox';

const Documents = ({ task, reduxDocuments, isCreator }) => {
  const [documents, setDocuments] = useState(reduxDocuments)
  const [fileSelected, setFileSelected] = useState(null)
  const [showLoader, setShowLoader] = useState(false)

  async function handleFileSelection (e) {
    const file = e.target.files[0]
    setFileSelected(file)
    const result = await upload(file, task.id)
  }
  

  return ( 
    <div className="modal__documents-block">
      <div className="document-list">
      <h2>
      <span class="title">
          Documents
      </span>
      <DocumentsActionBox 
        onAddRequest={() => document.getElementById('filedocument').click()} 
        onRemoveRequest={''} />
      <input id="filedocument" type="file" hidden onChange={(e) => handleFileSelection(e)} />
      </h2>
      <div className="document-group">
        { documents.length > 0 ?
          documents?.map(document => 
            <div className="document">
              <span className="document-cube"></span>
              <a href={`/assets/uploads/tasks/documents/${document.name}`} target="_blank" class="document-name">{
                document.name.substring(0, 30) + '...' + 
                document.name.substring((document.name.length - 4), (document.name.length))}</a>
            </div>
          )
          :
          <p className="unavailable">Aucun document disponible</p>
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