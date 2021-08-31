import React from 'react';
import { BasicCross } from '../../../components/Svg';

const Document = ({ document, onRemove, isCreator }) => {
  return ( 
    <div className="document">
      <span className="document-cube"></span>
      <a href={`/assets/uploads/tasks/documents/${document.name}`} target="_blank" class="document-name">{
        document.name.substring(0, 30) + '...' + 
        document.name.substring((document.name.length - 4), (document.name.length))}
      </a>
      {
        isCreator &&
        <span>
          <BasicCross className="adjust-right" onClick={(e) => onRemove(document)}/>
        </span>
      }  
    </div>
  );
}
 
export default Document;