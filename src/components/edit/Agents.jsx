import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { BOOLEANS, ECOLOGY } from './constants';
import { getAgent, getAgentFields, formatAgentFields, addOrUpdateAgent } from '../../services/agents';
import { TextInput, TextArea, RadioGroup, EnhancedCreatable } from '../shared/FormInputs';
import { FullScreenSpinner } from '../shared/shapes';

const blankAgent = {
  torder: '',
  family: '',
  mostCommon: false,
  biotic: true,
  type: '',
  subType: '',
  subSubType: '',
  ecology: '',
  commonName: '',
  notes: '',
};

const blankSynonym = {
  genus: '',
  species: '',
  subSpecies: '',
  authority: '',
  isPrimary: true,
};

const EditAgents = (props) => {
  const [selected, setSelected] = useState();
  const [selectedSynonym, setSelectedSynonym] = useState({...blankSynonym});
  const [selectedAgent, setSelectedAgent] = useState({...blankAgent});
  const [newAgent, setNewAgent] = useState(true);
  const [fields, setFields] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAgentFields()
    .then((fields) => {
      const formatted = formatAgentFields(fields);
      updateFields(formatted);
    });
  }, []);

  const resetState = () => {
    setSelected(null);
    setSelectedAgent({...blankAgent});
    setSelectedSynonym({...blankSynonym});
    setNewAgent(true);
    setLoading(false);
  }

  const onAgentSelected = (option) => {
    if (!option || !option.value) {
      resetState();
      return;
    }
    setSelected(option);
    setNewAgent(false);

    getAgent(option.value)
      .then(agent => setSelectedAgent(agent));
  }

  const onSelectChange = (selected) => {
    const agent = { ...selectedAgent, [selected.field]: selected.value };
    setSelectedAgent(agent);
  }

  const onInputChange = (e) => {
    const agent = { ...selectedAgent, [e.target.name]: e.target.value };
    setSelectedAgent(agent);
  }

  const onSynonymChange = (e) => {
    const synonym = { ...selectedSynonym, [e.target.name]: e.target.value };
    setSelectedSynonym(synonym);
  }

  const onSubmit = () => {
    setLoading(true);
    let agent;
    if (newAgent) {
      agent = {};
      agent.agent = selectedAgent;
      agent.synonym = selectedSynonym;
    } else {
      agent = selectedAgent;
    }
    addOrUpdateAgent(agent)
      .then(props.refresh)
      .then(() => resetState())
      .catch(() => setLoading(false));
  }

  updateFields(fields) {
    setFields(fields);
  }

    const { options } = props;

    return (
      <div>
        <h3>Agents</h3>
        <Select
          options={options}
          onChange={onAgentSelected}
          value={selected}
          placeholder="Type to search by species or common name"
          style={{ marginBottom: '15px' }}
        />
        {loading ? <FullScreenSpinner /> : null}
        {
          newAgent ? (
            <div style={{ display: 'flex' }}>
              <TextInput title="Genus" value={selectedSynonym.genus} name="genus" onChange={onSynonymChange} />
              <TextInput title="Species" value={selectedSynonym.species} name="species" onChange={onSynonymChange} />
              <TextInput title="Sub-species" value={selectedSynonym.subSpecies} name="subSpecies" onChange={onSynonymChange} />
              <TextInput title="Taxonomic authority" value={selectedSynonym.authority} name="authority" onChange={onSynonymChange} />
            </div>
        ) : null}
        <EnhancedCreatable title="Order" name="torder" value={selectedAgent.torder} onChange={onSelectChange} options={fields.torder} />
        <EnhancedCreatable title="Family" name="family" value={selectedAgent.family} onChange={onSelectChange} options={fields.family} />
        <RadioGroup title="Most Common" selected={selectedAgent.mostCommon} name="mostCommon" options={BOOLEANS} onChange={onInputChange} />
        <RadioGroup title="Biotic" selected={selectedAgent.biotic} name="biotic" options={BOOLEANS} onChange={onInputChange} />
        <EnhancedCreatable title="Type" value={selectedAgent.type} name="type" onChange={onSelectChange} options={fields.type} />
        <EnhancedCreatable title="Sub-type" value={selectedAgent.subType} name="subType" onChange={onSelectChange} options={fields.subType} />
        <EnhancedCreatable title="Sub sub-type" value={selectedAgent.subSubType} name="subSubType" onChange={onSelectChange} options={fields.subSubType} />
        <RadioGroup title="Ecology" selected={selectedAgent.ecology} name="ecology" options={ECOLOGY} onChange={onInputChange} />
        <TextInput title="Common Name" value={selectedAgent.commonName} name="commonName" onChange={onInputChange} />
        <TextArea title="Notes" value={selectedAgent.notes} limit={65535} name="notes" onChange={onInputChange} />
        <button onClick={onSubmit}>SUBMIT</button>
      </div>
    );
}

EditAgents.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array,
};

export default EditAgents;