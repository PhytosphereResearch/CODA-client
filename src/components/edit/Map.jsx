import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import counties from '../shared/caCountiesTopo.json';

const baseStyle = {
  default: {
    fill: '#DDD',
    stroke: 'white',
    strokeWidth: '.7px',
  },
  hover: {
    fill: '#CFCFCF',
  },
  pressed: {
    fill: '#BBB',
  },
};

const rangeStyle = {
  default: {
    ...baseStyle.default,
    fill: '#9D0D2F',
  },
  hover: {
    fill: '#870826',
  },
  pressed: {
    fill: '#BBB',
  },
};

export default class CAMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: 0,
      mouseY: 0,
      county: null,
    };
    autobind(this);
  }

  handleMove(geography, evt) {
    const x = evt.clientX;
    const y = evt.clientY + window.pageYOffset;
    if (evt.type === 'mousemove') {
      this.setState({
        mouseX: x,
        mouseY: y,
        county: geography.properties.fullName,
      });
    } else {
      this.setState({
        county: null,
      });
    }
  }

  handleClick(e) {
    if (!this.props.editable) {
      return;
    }
    const county = e.properties.name;
    this.props.onMapChange(county);
  }

  render() {
    const { mouseX, mouseY, county } = this.state;
    const { countyRange } = this.props;
    return (
      <div >
        {county && (
          <div
            style={{
              position: 'absolute',
              top: `${mouseY - 20}px`,
              left: `${mouseX}px`,
              pointerEvents: 'none',
              zIndex: '10',
            }}
          >
              {county}
          </div>
        )}
        <ComposableMap width={300} height={450} projectionConfig={{
        scale: 2200,
      }}>
          <ZoomableGroup zoom={1} disablePanning center={[-119, 37.3]}>
            <Geographies geography={counties} disableOptimization>
              {(geographies, projection) => geographies.map(geography => (
                <Geography
                  key={geography.id}
                  geography={geography}
                  projection={projection}
                  style={countyRange.find(c => c === geography.properties.name) ? rangeStyle : baseStyle}
                  onMouseMove={this.handleMove}
                  onMouseLeave={this.handleMove}
                  onClick={this.handleClick}
                />
                  ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

CAMap.propTypes = {
  countyRange: PropTypes.array,
  onMapChange: PropTypes.func,
  editable: PropTypes.bool,
};
