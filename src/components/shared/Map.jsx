import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import counties from '../shared/caCountiesTopo.json';

const baseStyle = {
  default: {
    fill: '#DDDDDD',
    stroke: 'white',
    strokeWidth: '.7px',
  },
  hover: {
    fill: '#CFCFCF',
  },
  pressed: {
    fill: '#BBBBBB',
  },
};

const interactionStyle = {
  default: {
    ...baseStyle.default,
    fill: '#850B28',
  },
  hover: {
    fill: '#5C0519',
  },
  pressed: {
    fill: '#BBBBBB',
  },
};

const rangeStyle = {
  default: {
    ...baseStyle.default,
    fill: '#FF5555',
  },
  hover: {
    fill: '#b21339',
  },
  pressed: {
    fill: '#BBBBBB',
  },
};

const CAMap = (props) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [county, setCounty] = useState(null);

  let clientWidth = 0;

  const handleMove = (evt, selectedCounty) => {
    const x = evt.clientX;
    const y = evt.clientY + window.scrollY;

    if (evt.type === 'mousemove') {
      setMouseX(x);
      setMouseY(y);
      setCounty(selectedCounty);
    } else {
      setCounty(null);
    }
  }

  const handleClick = (e) => {
    if (!props.editable) {
      return;
    }
    const selectedCounty = e.properties.name;
    props.onMapChange(selectedCounty);
  }

    const { interactionRange, agentRange } = props;
    return (
      <div >
        {county && (
          <div
            className="tooltip"
            style={{
              position: 'absolute',
              top: `${mouseY - 35}px`,
              left: `${mouseX - (clientWidth / 2)}px`,
              pointerEvents: 'none',
              zIndex: '10',
            }}
            ref={(el) => { if (el) clientWidth = el.clientWidth; }}
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
                    onMouseMove={(e) => handleMove(e, geography?.properties?.fullName)}
                    onMouseLeave={e => handleMove(e, geography?.properties?.fullName)}
                    onClick={handleClick}
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

CAMap.propTypes = {
  interactionRange: PropTypes.array,
  agentRange: PropTypes.array,
  onMapChange: PropTypes.func,
  editable: PropTypes.bool,
};

export default CAMap;