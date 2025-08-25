import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { X } from '../shared/shapes';

const Legal = (props) => (
  <Modal
    isOpen={props.show}
    className="modal"
    overlayClassName="overlay"
    contentLabel="About CODA"
    onRequestClose={props.handleCloseModal}
  >
    <div className="modal-header">
      <h3>Copyright Notice and Disclaimer</h3>
      <a className="close-modal" onClick={props.handleCloseModal}>
        <X />
      </a>
    </div>
    <div className="content-box">
      <div>
        <p>
          Copyright <b>©</b>2008-2017 Phytosphere Research, Vacaville, CA,
          95687-5495 USA. All rights reserved.
        </p>
        <hr />
        <p>
          The names of other companies and products listed herein are trademarks
          or registered trademarks of their respective trademark owners.
        </p>
        <hr />
        <p>
          <b>
            THIS PUBLICATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,
            EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, OR NON-INFRINGEMENT.
          </b>
        </p>
        <p>
          Phytosphere Research shall not be liable for direct, indirect,
          special, incidental, or consequential damages, or damages for lost
          profits, loss of revenue, or loss of use, related to your decision to
          use any of the information and/or materials listed and/or posted on
          this Web Site, even if Phytosphere Research is advised of the
          possibility of such damage.
        </p>
        <p>
          Phytosphere Research shall not be responsible for any errors or
          omissions contained at this Web Site, and reserves the right to make
          changes without notice.
        </p>

        <div className="modal-header">
          <h3>Nondiscrimination Statement</h3>
        </div>
        <p>
          In accordance with Federal law and U.S. Department of Agriculture
          policy, this institution is prohibited from discriminating on the
          basis of race, color, national origin, sex, age or disability. (Not
          all prohibited bases apply to all programs.)
        </p>
        <p>
          To file a complaint of discrimination: write USDA, Director, Office of
          Civil Rights, Room 326-W, Whitten Building, 1400 Independence Avenue,
          SW, Washington, D.C. 20250-9410, or call (202) 720-5964 (voice and
          TDD). USDA is an equal opportunity provider and employer.
        </p>
      </div>
    </div>
  </Modal>
);

Legal.propTypes = {
  show: PropTypes.bool,
  handleCloseModal: PropTypes.func,
};

export default Legal;
