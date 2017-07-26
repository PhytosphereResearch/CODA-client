import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

export default class Questions extends Component {
  render () {
    return (
      <Modal
        isOpen={this.props.show}
        contentLabel="Minimal Modal Example"
        >
          <div className="content-box">
            <h3>QUESTIONS</h3>
            If you have questions about the CODA program, or additional information that should be included in CODA (new records, taxonomic changes, additional range or symptom information, etc.) please contact:
             phytosphere@phytosphere.com.
          </div>
          <button onClick={this.props.handleCloseModal}>Close Modal</button>
        </Modal>
    )
  }
}

Questions.propTypes = {
  show: PropTypes.bool,
  handleCloseModal: PropTypes.func
}
