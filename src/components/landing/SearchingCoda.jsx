import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { X } from '../shared/shapes';

const SearchingCoda = props => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={props.show}
    contentLabel="Searching Coda"
    onRequestClose={props.handleCloseModal}
  >
    <div className="modal-header">
      <h3>SEARCHING CODA</h3>
      <a className="close-modal" onClick={props.handleCloseModal}><X /></a>
    </div>
    <div className="content-box">
      <p>The tabs in the CODA website allow you to search for the following information:</p>
      <Link to="/oaks"><b>Oaks</b></Link>
      <p>Search for the description of any of the oak hosts in the database. You can search using the scientific
             name, common name, or characteristics in the description (e.g., evergreen).  Oak images and range information are provided through external links.
      </p>
      <Link to="/agents"><b>Agents</b></Link>
      <p>
             Find information about individual agents by seaching on their scientific names, including non-current scientific names that are included as synonyms in CODA.  You can also search by agent common name, though many agents do not have common names.  Agent records show the classification of the agent, notes, and links to agent images in CalPhotos.
      </p>
      <Link to="/hi"><b>Interactions</b></Link>
      <p>Use the interactions tab to find agents that cause a given symptom (example photos are available) on a specified part (e.g., leaf, branch, trunk) of a given oak. You must specify the host oak at minimum. Modify your search by changing search terms.  Click on the database search results to see a full data record showing information on the agent, symptoms caused on various parts of the oak, references, and other information.
      </p>
    </div>
  </Modal>
);

SearchingCoda.propTypes = {
  show: PropTypes.bool,
  handleCloseModal: PropTypes.func,
};

export default SearchingCoda;
