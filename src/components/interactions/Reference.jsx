import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-smooth-collapse';
import { Notes } from '../shared/partials';

export default class Reference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    const { cite } = this.props;
    return (
      <div>
        <span className="cite" onClick={() => this.setState({ show: !this.state.show })}> • {cite.description}</span>
        <Collapse expanded={this.state.show}>
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
}

Reference.propTypes = {
  cite: PropTypes.object,
};
