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

const interactionStyle = {
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

const rangeStyle = {
  default: {
    ...baseStyle.default,
    fill: '#d0113e',
  },
  hover: {
    fill: '#b21339',
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
    this.clientWidth = 0;
    autobind(this);
  }

  handleMove(evt) {
    const geography = evt?.target;
    const x = evt.clientX;
    const y = evt.clientY + window.scrollY;
    console.log('geography', geography)
    if (evt.type === 'mousemove') {
      this.setState({
        mouseX: x,
        mouseY: y,
        county: geography?.properties?.fullName,
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
    const { interactionRange, agentRange } = this.props;
    return (
      <div >
        {county && (
          <div
            className="tooltip"
            style={{
              position: 'absolute',
              top: `${mouseY - 35}px`,
              left: `${mouseX - (this.clientWidth / 2)}px`,
              pointerEvents: 'none',
              zIndex: '10',
            }}
            ref={(el) => { if (el) this.clientWidth = el.clientWidth; }}
          >
            <span className="tooltiptext">{county}</span>
          </div>
        )}
        <ComposableMap
          width={300}
          height={450}
          projectionConfig={{
        scale: 2200,
      }}>
          <ZoomableGroup zoom={1} disablePanning={true} center={[-119, 37.3]}>
            <Geographies geography={counties} disableOptimization={true}>
              {(geographies, projection) => {
                return geographies.geographies.map((geography) => {
                let style = baseStyle;
                if (interactionRange.find(c => c === geography.properties.name)) {
                  style = interactionStyle;
                } else if (agentRange.find(c => c === geography.properties.name)) {
                  style = rangeStyle;
                }
                return (
                  <Geography
                    key={geography.id}
                    geography={geography}
                    projection={projection}
                    style={style}
                    onMouseMove={this.handleMove}
                    onMouseLeave={this.handleMove}
                    onClick={this.handleClick}
                  />
                );
              })}}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        { interactionRange.length && agentRange.length ?
          <div>
            <span>
              <div className="mapKey" style={{ backgroundColor: interactionStyle.default.fill }} />
            Interaction Range
            </span>
            <span>
              <div className="mapKey" style={{ backgroundColor: rangeStyle.default.fill }} />
            Agent Range
            </span>
          </div>
        : null
      }
      </div>
    );
  }
}

CAMap.propTypes = {
  interactionRange: PropTypes.array,
  agentRange: PropTypes.array,
  onMapChange: PropTypes.func,
  editable: PropTypes.bool,
};
