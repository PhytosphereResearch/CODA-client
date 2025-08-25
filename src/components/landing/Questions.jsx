import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { X } from "../shared/shapes";

const Questions = (props) => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={props.show}
    contentLabel="Questions"
    onRequestClose={props.handleCloseModal}
  >
    <div className="modal-header">
      <h3>QUESTIONS</h3>
      <a className="close-modal" onClick={props.handleCloseModal}>
        <X />
      </a>
    </div>
    <div className="content-box">
      If you have questions about the CODA program, or additional information
      that should be included in CODA (new records, taxonomic changes,
      additional range or symptom information, etc.) please contact:
      phytosphere@phytosphere.com.
    </div>
  </Modal>
);

Questions.propTypes = {
  show: PropTypes.bool,
  handleCloseModal: PropTypes.func,
};

export default Questions;
