import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import useSWRMutation from 'swr/mutation';
import { useAuth0 } from "@auth0/auth0-react";
import { BOOLEANS, ECOLOGY } from './constants';
import { getAgent, addOrUpdateAgent, getAllAgentSynonyms } from '../../services/agents';
import { TextInput, TextArea, RadioGroup, EnhancedCreatable } from '../shared/FormInputs';
import { FullScreenSpinner } from '../shared/shapes';
import useAgents from '../../hooks/useAgents';
import isLikelyRepeat from '../../utils/checkunique';
import { jwtDecode } from 'jwt-decode';




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
  const [selectedSynonym, setSelectedSynonym] = useState({ ...blankSynonym });
  const [selectedAgent, setSelectedAgent] = useState({ ...blankAgent });
  const [newAgent, setNewAgent] = useState(true);
  const [isRepeat, setIsRepeat] = useState(false);
  const { agentFields: fields, agents } = useAgents()
  const { getAccessTokenSilently } = useAuth0();
  const { trigger: update, isMutating: loading } = useSWRMutation('/api/agents', addOrUpdateAgent)


  const resetState = () => {
    setSelected(null);
    setSelectedAgent({ ...blankAgent });
    setSelectedSynonym({ ...blankSynonym });
    setNewAgent(true);
  }

  const onAgentSelected = (option) => {
    if (!option || !option.value) {
      resetState();
      return;
    }
    setSelected(option);
    setNewAgent(false);
    setIsRepeat(false);

    getAgent(option.value)
      .then(agent => setSelectedAgent(agent));
  }

  const onSelectChange = (selected, field) => {
    const agent = { ...selectedAgent, [field]: selected.value };
    setSelectedAgent(agent);
  }

  const onInputChange = (e) => {
    const agent = { ...selectedAgent, [e.target.name]: e.target.value };
    setSelectedAgent(agent);
  }

  const onSynonymChange = (e) => {
    const synonym = { ...selectedSynonym, [e.target.name]: e.target.value };
    const alreadyExists = newAgent && agents.find(agent => isLikelyRepeat(agent, synonym));
    setIsRepeat(alreadyExists);
    setSelectedSynonym(synonym);
  }

  const onSubmit = async () => {
    let agent;
    if (newAgent) {
      agent = {};
      agent.agent = selectedAgent;
      agent.synonym = selectedSynonym;
    } else {
      agent = selectedAgent;
    }
    const accessToken = await getAccessTokenSilently();
    console.log("Agents.jsx accessToken=", accessToken);
    const decoded = jwtDecode(accessToken);
    console.log("Agents.jsx decoded=", decoded);
  
    // const GetUserDetails = async userId => {
    //   console.log('userId', userId);

    //   accessToken
    //     .getUser({ id: userId })
    //     .then(function (users) {
    //       console.log(users);
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    // };

    // const userId = 'auth0|xxxx';

    // GetUserDetails(userId);

    update({ agent, accessToken })
      .then(() => resetState());
  }

  const { options } = props;
  return (
    <div>
      <h3>Agents</h3>
      <Select
        options={options}
        onChange={onAgentSelected}
        value={selected}
        placeholder="Type in this box to search the database for agents by species or common name"
        style={{ marginBottom: '15px' }}
      />
      {loading ? <FullScreenSpinner /> : null}
      <p>If the agent does not yet exist in CODA, add it by filling in the information below:</p>
      {
        newAgent ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <TextInput title="Genus" value={selectedSynonym.genus} name="genus" onChange={onSynonymChange} />
            <TextInput title="Species" value={selectedSynonym.species} name="species" onChange={onSynonymChange} />
            <TextInput title="Sub-species" value={selectedSynonym.subSpecies} name="subSpecies" onChange={onSynonymChange} />
            <TextInput title="Taxonomic authority" value={selectedSynonym.authority} name="authority" onChange={onSynonymChange} />
          </div>
        ) : null}
      {isRepeat ? (<><div>Warning: <em>{selectedSynonym.genus} {selectedSynonym.species} {selectedSynonym.subSpecies}</em> already exists. Do not create a new agent record, select it from the dropdown above.</div></>) : null
      }
      {fields.data ? (
        <>
          <EnhancedCreatable title="Type" value={selectedAgent.type} name="type" onChange={(e) => onSelectChange(e, "type")} options={fields.data.type} />
          <EnhancedCreatable title="Sub-type" value={selectedAgent.subType} name="subType" onChange={(e) => onSelectChange(e, "subType")} options={fields.data.subType} />
          <EnhancedCreatable title="Sub sub-type" value={selectedAgent.subSubType} name="subSubType" onChange={(e) => onSelectChange(e, "subSubType")} options={fields.data.subSubType} />

          <EnhancedCreatable title="Order" name="torder" value={selectedAgent.torder} onChange={(e) => onSelectChange(e, "torder")} options={fields.data.torder} />
          <EnhancedCreatable title="Family" name="family" value={selectedAgent.family} onChange={(e) => onSelectChange(e, "family")} options={fields.data.family} />
          <RadioGroup title="Most Common" selected={selectedAgent.mostCommon} name="mostCommon" options={BOOLEANS} onChange={onInputChange} />
          <RadioGroup title="Biotic" selected={selectedAgent.biotic} name="biotic" options={BOOLEANS} onChange={onInputChange} />

          <RadioGroup title="Ecology" selected={selectedAgent.ecology} name="ecology" options={ECOLOGY} onChange={onInputChange} />
          <TextInput title="Common Name" value={selectedAgent.commonName} name="commonName" onChange={onInputChange} />
          <TextArea title="Notes" value={selectedAgent.notes} limit={65535} name="notes" onChange={onInputChange} />
        </>
      ) : null}
      <button onClick={onSubmit}>SUBMIT</button>
    </div>
  );
};

EditAgents.propTypes = {
  options: PropTypes.array,
};

export default EditAgents;