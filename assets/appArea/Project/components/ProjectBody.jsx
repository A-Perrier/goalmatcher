import React from 'react';
import Section from './Section';
import { connect } from 'react-redux'
import NewSectionHandler from './Creators/NewSectionHandler';

const ProjectBody = ({ sections, isCreator }) => {
  return ( 
    <section className="project">
      { sections?.map((section, index) => 
        <Section key={index} section={section} />
      )}
      {
        isCreator &&
        <NewSectionHandler />
      }
    </section>
  );
}


const mapStateToProps = (state) => {
  return {
    isCreator: state.isCreator
  }
}

export default connect(mapStateToProps)(ProjectBody);