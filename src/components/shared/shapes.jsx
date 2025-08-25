import React from 'react';
import PropTypes from 'prop-types';

export const X = () => (
  <svg width="15" height="15">
    <line x1="0" y1="0" x2="15" y2="15" strokeWidth="2" />
    <line x1="15" y1="0" x2="0" y2="15" strokeWidth="2" />
  </svg>
);

export const Spinner = ({ size }) => (
  <div
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <div style={{ width: size, height: size }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(80,50)">
          <g transform="rotate(0)">
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="#214171"
              fillOpacity="1"
              transform="scale(1.08583 1.08583)"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.875s"
                values="1.1 1.1;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.875s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(71.21320343559643,71.21320343559643)">
          <g transform="rotate(45)">
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="#214171"
              fillOpacity="0.875"
              transform="scale(1.09833 1.09833)"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.75s"
                values="1.1 1.1;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.75s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(50,80)">
          <g transform="rotate(90)">
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="#214171"
              fillOpacity="0.75"
              transform="scale(1.01083 1.01083)"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.625s"
                values="1.1 1.1;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.625s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(28.786796564403577,71.21320343559643)">
          <g transform="rotate(135)">
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="#214171"
              fillOpacity="0.625"
              transform="scale(1.02333 1.02333)"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.5s"
                values="1.1 1.1;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.5s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(20,50.00000000000001)">
          <g transform="rotate(180)">
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="#214171"
              fillOpacity="0.5"
              transform="scale(1.03583 1.03583)"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.375s"
                values="1.1 1.1;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.375s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(28.78679656440357,28.786796564403577)">
          <g transform="rotate(225)">
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="#214171"
              fillOpacity="0.375"
              transform="scale(1.04833 1.04833)"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.25s"
                values="1.1 1.1;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.25s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(49.99999999999999,20)">
          <g transform="rotate(270)">
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="#214171"
              fillOpacity="0.25"
              transform="scale(1.06083 1.06083)"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.125s"
                values="1.1 1.1;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.125s"
              />
            </circle>
          </g>
        </g>
        <g transform="translate(71.21320343559643,28.78679656440357)">
          <g transform="rotate(315)">
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="#214171"
              fillOpacity="0.125"
              transform="scale(1.07333 1.07333)"
            >
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="0s"
                values="1.1 1.1;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="0s"
              />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  </div>
);

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 150,
};

export const FullScreenSpinner = () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      position: 'fixed',
      top: '0',
      left: '0',
      background: 'rgba(255, 255, 255, .5)',
      zIndex: '10',
    }}
  >
    <Spinner />
  </div>
);
