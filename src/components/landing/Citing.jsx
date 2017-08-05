import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { X } from '../shared/shapes.jsx';

export default class Citing extends Component {
  render () {
    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={this.props.show}
        contentLabel="Citing CODA"
        onRequestClose={this.props.handleCloseModal}
        >
          <div className="modal-header">
            <h3>CITING THE CODA DATABASE</h3>
            <a className="close-modal" onClick={this.props.handleCloseModal}><X /></a>
          </div>
          <div className="content-box">
            <p>The following citation may be used to cite material listed in the CODA database:</p>
            <p>Swiecki, T. J; Bernhardt, E. A.; Arnold, R.A. 2003 - present. California oak disease and arthropod (CODA) database. Version 2014Dec16. [web application].  Vacaville, CA: Phytosphere Research. Available: http://coda.phytosphere.com/ [Accessed {'{'}insert access date{'}'}] </p>
          </div>
        </Modal>
    );
  }
}

Citing.propTypes = {
  show: PropTypes.bool,
  handleCloseModal: PropTypes.func
};
