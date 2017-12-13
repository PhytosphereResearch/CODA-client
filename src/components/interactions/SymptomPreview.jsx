import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

const defaultStyle = {
  height: '300px',
  width: '300px',
  maxWidth: '100%',
  maxHeight: '100%',
  border: '1px solid lightgrey',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
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
    let { plantPart, symptom, description, style } = this.props;

    if (!plantPart || !symptom ) {
      return (
        <div style={{ ...defaultStyle, ...style, textAlign: 'center' }}>
          <h4>An image of the selected symptom will appear here</h4>
        </div>
      );
    }

    let image = this.state.hasError ? (
        <div
          style={defaultStyle}>
          <h4>
            No image available
          </h4>
        </div>
      ) : (
        <img
          style={{ maxWidth: '100%' }}
          src={`/images/symptoms/${plantPart}/${symptom.label.replace(/ /g, '_')}.jpg`}
          alt={`${symptom.label} on ${plantPart}`}
          onError={() => this.handleError()}
        />
      );

    return (
      <div style={{ ...style }}>
        {image}
        <p style={{ maxWidth: '300px' }}>{description || symptom.description}</p>
      </div>
    );
  }
}

SymptomPreview.propTypes = {
  plantPart: PropTypes.string,
  symptom: PropTypes.object,
  description: PropTypes.string
};
