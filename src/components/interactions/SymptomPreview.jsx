import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

const style = {
  height: '300px',
  width: '300px',
  border: '1px solid lightgrey',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default class SymptomPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
    autobind(this);
  }

  componentWillReceiveProps() {
    this.setState({ hasError: false });
  }

  handleError() {
    this.setState({ hasError: true });
  }

  render() {
    let { plantPart, symptom } = this.props;

    if (!plantPart || !symptom ) {
      return (
        <div style={{ ...style, textAlign: 'center' }}>
          <h4>An image of the selected symptom will appear here</h4>
        </div>
      );
    }

    let image = this.state.hasError ? (
        <div
          style={style}>
          <h4>
            No image available
          </h4>
        </div>
      ) : (
        <img
          src={`./images/symptoms/${plantPart}/${symptom.label.replace(/ /g, '_')}.jpg`}
          alt={`${symptom.label} on ${plantPart}`}
          onError={() => this.handleError()}
        />
      );

    return (
      <div>
        {image}
        <p style={{ maxWidth: '300px' }}>{symptom.description}</p>
      </div>
    );
  }
}

SymptomPreview.propTypes = {
  plantPart: PropTypes.string,
  symptom: PropTypes.object
};
