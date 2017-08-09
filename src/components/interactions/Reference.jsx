import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notes } from 'coda/components/shared/partials.jsx';
import Collapse from 'react-smooth-collapse';

export default class Reference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    let { cite } = this.props;
    return (
      <div>
        <span className="cite" onClick={() => this.setState({ show: !this.state.show })}> • {cite.description}</span>
        <Collapse expanded={this.state.show}>
          <div style={{ paddingLeft: '20px' }}>
            <div>
              {cite.author} {cite.year}. {cite.title} {cite.source}
            </div>
            <Notes notes={cite.notes} />
          </div>
        </Collapse>
      </div>
    );
  }
}

Reference.propTypes = {
  cite: PropTypes.object
};
