import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Outlet, useNavigate } from 'react-router';

const Agents = (props) => {
  const [ selected, setSelected ] = useState();
  const navigate = useNavigate();

  const onAgentSelected = (option) => {
    setSelected(option);
    option.value ? navigate(`/agents/${option.value}`) : navigate('/agents');
  }

    const { options } = props;

    return (
      <div>
        <h2>Find an Agent</h2>
        <Select
          options={options}
          onChange={onAgentSelected}
          value={selected}
          placeholder="Type to search by species or common name"
          style={{ marginBottom: '15px' }}
        />
        <Outlet />
      </div>
    );
}

Agents.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })),
  agents: PropTypes.arrayOf(PropTypes.object)
};

export default Agents;
