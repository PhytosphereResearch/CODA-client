import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notes } from 'coda/components/shared/partials.jsx';

export default class Reference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    let { cite } = this.props;
    return(
      <div>
        <span className="cite" onClick={() => this.setState({ show: !this.state.show })}>{cite.description}</span>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <p>
            {cite.author} {cite.year}. {cite.title} {cite.source}
          </p>
          <Notes notes={cite.notes} />
        </div>
      </div>
    );
  }
}

Reference.propTypes = {
  cite: PropTypes.object
};
