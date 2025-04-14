import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import useSWRMutation from 'swr/mutation';
import { useAuth0 } from "@auth0/auth0-react";
import { ScientificName, Synonyms } from '../shared/partials';
import { RadioGroup, TextInput, TextArea } from '../shared/FormInputs';
import { getAgent, addOrUpdateSynonym } from '../../services/agents';
import { BOOLEANS } from './constants';


 const ADD = 'Create new synonym';
 const EDIT = 'Edit existing synonym';

 const ADD_EDIT = [ADD, EDIT];


console.log (ADD_EDIT);
const blankSynonym = {
  genus: '',
  species: '',
  subSpecies: '',
  authority: '',
  isPrimary: false,
  notes: '',
};

const EditSynonyms = (props) => {
  const [selected, setSelected] = useState();
  const [selectedAgent, setSelectedAgent] = useState();
  const [selectedSynonym, setSelectedSynonym] = useState();
  const [newSynonym, setNewSynonym] = useState(false);
  const [prevSynonym, setPrevSynonym] = useState();
  const { getAccessTokenSilently } = useAuth0();

  const { trigger: update } = useSWRMutation('/api/agents', addOrUpdateSynonym)

  const resetState = () => {
    setSelected(undefined);
    setSelectedAgent(undefined);
    setFormattedSynonyms([]);
    setSelectedSynonym(undefined);
    setNewSynonym(false);
    setPrevSynonym(undefined);
  }

  const onAgentSelected = (option) => {
    if (!option || !option.value) {
      resetState();
      return;
    }
    getAgent(option.value)
      .then((agent) => {
        let selectedSynonym = agent.synonyms.find(synonym => synonym.id === option.synId);
        selectedSynonym = { ...selectedSynonym };
        setSelectedAgent(agent);
        setSelectedSynonym(selectedSynonym);
        setSelected(option);
        setNewSynonym(false);
      });
  }

  const onSynonymChange = (e) => {
    const updatedSynonym = { ...selectedSynonym, [e.target.name]: e.target.value };
    setSelectedSynonym(updatedSynonym);
  }

  const createSynonym = (event) => {
    if ((event.target.value === EDIT && !newSynonym) || (event.target.value === ADD && newSynonym)) {
      return;
    } else if (event.target.value === EDIT) {
      setNewSynonym(false);
      setSelectedSynonym(prevSynonym);
    } else {
      const newPrevSynonym = { ...selectedSynonym };
      setNewSynonym(true);
      setSelectedSynonym({ ...blankSynonym });
      setPrevSynonym(newPrevSynonym);
    }
  }

  const submitSynonym = async () => {
    const submittedSynonym = { ...selectedSynonym };
    if (submittedSynonym.isPrimary === 'true' || submittedSynonym.isPrimary === true) {
      submittedSynonym.isPrimary = 1;
    } else {
      submittedSynonym.isPrimary = 0;
    }
    if (newSynonym) {
      submittedSynonym.agentId = selectedAgent.id;
    }

    const accessToken = await getAccessTokenSilently();
    update({ synonym: submittedSynonym, accessToken })
      .then(resetState());
  }

  const options = props.options;
  const primary = selectedAgent ? selectedAgent.primarySynonym : null;

  const otherSynonyms = selectedAgent && selectedAgent.otherSynonyms.length ? (
    <div>
      <Synonyms synonyms={selectedAgent.otherSynonyms} />
    </div>
  ) : null;
  return (
    <div>
      <h3>Agent Synonyms</h3>
      <Select
        options={options}
        onChange={onAgentSelected}
        value={selected}
        placeholder="Type to search database for synonyms by species or common name"
        style={{ marginBottom: '15px' }}
      />
      {selectedAgent ? (
        <div>
          <ScientificName
            genus={primary.genus}
            species={primary.species}
            subSpecies={primary.subSpecies}
            authority={primary.authority}
          />
          {otherSynonyms}
          <br/>
          <RadioGroup
            title="Add a new synonym or edit an existing synonym"
            selected={newSynonym ? 'Create new synonym' : 'Edit existing synonym'}
            name="addOrEditSyn"
            options={ADD_EDIT}
            onChange={createSynonym}
          />
          <TextInput title="Genus" value={selectedSynonym.genus} name="genus" onChange={onSynonymChange} />
          <TextInput title="Species" value={selectedSynonym.species} name="species" onChange={onSynonymChange} />
          <TextInput title="Sub-species" value={selectedSynonym.subSpecies} name="subSpecies" onChange={onSynonymChange} />
          <TextInput title="Taxonomic authority" value={selectedSynonym.authority} name="authority" onChange={onSynonymChange} />
          <RadioGroup
            title="Currently accepted name? To change the currently accepted name, edit or create the synonym that you want to make the current accepted name and change false to true"
            selected={selectedSynonym.isPrimary}
            name="isPrimary"
            options={BOOLEANS}
            disabled={selectedAgent.primarySynonym.id === selectedSynonym.id}
            onChange={onSynonymChange}
          />
          <TextArea title="Notes" value={selectedSynonym.notes} limit={65535} name="notes" onChange={onSynonymChange} />
        </div>
      ) : null}
      {selectedAgent ? <button onClick={submitSynonym}>SUBMIT</button> : null}
    </div>
  );
}

EditSynonyms.propTypes = {
  options: PropTypes.array,
};

export default EditSynonyms;