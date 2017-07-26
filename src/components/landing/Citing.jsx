import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

export default class Citing extends Component {
  render () {
    return (
      <Modal
        isOpen={this.props.show}
        contentLabel="Citing CODA"
        >
          <div className="content-box">
            <h3>CITING THE CODA DATABASE</h3>
            <p>The following citation may be used to cite material listed in the CODA database:</p>
            <p>Swiecki, T. J; Bernhardt, E. A.; Arnold, R.A. 2003 - present. California oak disease and arthropod (CODA) database. Version 2014Dec16. [web application].  Vacaville, CA: Phytosphere Research. Available: http://coda.phytosphere.com/ [Accessed {'{'}insert access date{'}'}] </p>
          </div>
          <button onClick={this.props.handleCloseModal}>Close Modal</button>
        </Modal>
    )
  }
}

Citing.propTypes = {
  show: PropTypes.bool,
  handleCloseModal: PropTypes.func
}
