import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

export default class About extends Component {
  render () {
    return (
      <Modal
        isOpen={this.props.show}
        contentLabel="About CODA"
        >
          <div className="content-box">
            <h3>ABOUT CODA</h3>
              CODA was created to compile data from diverse sources with the goal of increasing communication and understanding about oak pests and diseases in California. New pest and pathogen records, expanded range information, and other updated information have been added to the database over time.
            <p>CODA database and its initial access program were originally developed for the
              <a href="http://frap.cdf.ca.gov/index.htm">Forest and Rangeland Resource Assessment Program</a> of the California Department of Forestry and Fire Protection. The original information in the database was compiled by Ted Swiecki and Elizabeth Bernhardt (<a href="http://phytosphere.com">Phytosphere Research</a>) and Richard Arnold <a href="http://www.ecsltd.com/index.htm" target="_blank">(Entomological Consulting Services, Ltd.)</a>. Elizabeth Bernhardt and Ted Swiecki have been responsible for subsequent updating of the database. The version date reflects the most recent date that any specific records were added or updated but does not imply that all records have been updated to the most current information.
              The CODA database interface has been modified multiple times since its original release in 1990 and first web-based platform in 2003.  The current (2016) interface of the CODA database was programmed by Frances Swiecki-Bernhardt. Previous web versions were programmed by Elizabeth Bernhardt, and the original database programming was by Jim Kellogg (Tierra Data Systems).&nbsp; Ginger Ogle (<a href="http://elib.cs.berkeley.edu:8080/">Digital
              Library Project, UC Berkeley</a>) provided valuable assistance in inital efforts
              to convert CODA to a web application and support for using the <a href="http://elib.cs.berkeley.edu:8080/photos/">CalPhotos</a>
              image library to serve images compiled for CODA. Additional funding in support of the CODA database has been provided by USDA-Forest Service Region 5 and Phytosphere Research.</p>
          </div>
          <button onClick={this.props.handleCloseModal}>Close Modal</button>
        </Modal>
    )
  }
}

About.propTypes = {
  show: PropTypes.bool,
  handleCloseModal: PropTypes.func
}
