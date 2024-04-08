import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-smooth-collapse';
import { Notes } from '../shared/partials';

const Reference = (props) => {
  const [show, setShow] = useState(false);
  const onClick = () => {
    const updatedShow = !show;
    setShow(updatedShow);
  }

    const { cite } = props;
    return (
      <div>
        <span className="cite" onClick={onClick}> • {cite.description}</span>
        <Collapse expanded={show}>
          <div style={{ paddingLeft: '20px' }}>
            <div>
              {cite.author} {cite.year}. {cite.title} {cite.source}
            </div>
            { cite.notes ? <Notes notes={cite.notes} /> : null }
          </div>
        </Collapse>
      </div>
    );
}

Reference.propTypes = {
  cite: PropTypes.object,
};

export default Reference;
