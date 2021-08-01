import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addToArray, removeFromArray } from '../../../helpers/functions';
import { remove, upload } from '../services/Api/Document';
import DocumentsActionBox from './ActionBox/DocumentsActionBox';
import Document from './Document';

const Documents = ({ task, reduxDocuments, isCreator }) => {
  const [documents, setDocuments] = useState(reduxDocuments)
  const [fileSelected, setFileSelected] = useState(null)
  const [showLoader, setShowLoader] = useState(false)

  async function handleFileSelection (e) {
    const file = e.target.files[0]
    setFileSelected(file)
    const { document, status } = await upload(file, task.id)
    if ( status === 201 ) setDocuments(addToArray(documents, document))
  }


  async function handleRemove (document) {
    const status = await remove(document.id)
    if (status === 200) setDocuments(removeFromArray(documents, document))
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
            <Document document={document} onRemove={(document) => handleRemove(document)} />
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