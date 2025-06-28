import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useAuth0 } from "@auth0/auth0-react";
import useSWRMutation from 'swr/mutation';
import { TextInput, TextArea, Checkbox } from '../shared/FormInputs';
import { addOrUpdateSymptom } from '../../services/interactions';
import SymptomPreview from '../interactions/SymptomPreview';

const blankSymptom = {
  symptom: '',
  description: '',
  acorn: false,
  branch: false,
  flower: false,
  leaf: false,
  root: false,
  trunk: false,
};

const plantParts = ['acorn', 'branch', 'flower', 'leaf', 'root', 'trunk'];

const EditSymptoms = (props) => {
  const [selected, setSelected] = useState();
  const [symptom, setSymptom] = useState({...blankSymptom});
  const { user, getAccessTokenSilently } = useAuth0();
  const { trigger: update } = useSWRMutation('/api/symptoms', addOrUpdateSymptom);
  const userName = user.name;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSymptom = { ...symptom };
    const accessToken = await getAccessTokenSilently();
    update({ symptom:updatedSymptom, accessToken, userName })
      .then(() => {
        setSymptom({ ...blankSymptom });
        setSelected(undefined);
      }
    );
  }

  const onSymptomSelected = (option) => {
    if (!option || !option.value) {
      setSelected(undefined);
      setSymptom({...blankSymptom});
      return;
    }
    setSelected(option);
    setSymptom(option);
  }

  const onInputChange = (e) => {
    const updatedSymptom = { ...symptom };
    const name = e.target.name;
    if (typeof symptom[name] === 'boolean') {
      updatedSymptom[name] = !updatedSymptom[name];
    } else {
      updatedSymptom[name] = e.target.value;
    }
    setSymptom(updatedSymptom);
  }

    const { options } = props;
    const disabled = !(plantParts.some(pp => symptom[pp]) && symptom.symptom);
    const selectedPlantParts = plantParts.filter(plantPart => symptom[plantPart]);

    return (
      <div>
        <h3>Symptoms</h3>
        <Select
          options={options}
          onChange={onSymptomSelected}
          value={selected}
          placeholder="Type here to search database for existing symptoms or use dropdown to scroll through list"
          style={{ marginBottom: '15px' }}
        />
        <h4>{selected ? 'Edit a Symptom:' : 'Add a Symptom:'}</h4>
        <form onSubmit={handleSubmit} onChange={onInputChange}>
          <TextInput title="Symptom Name" value={symptom.symptom} name="symptom" />
          Plant parts:
          <div>
            <Checkbox name="acorn" title="acorn" isChecked={symptom.acorn} />
            <Checkbox name="branch" title="branch" isChecked={symptom.branch} />
            <Checkbox name="flower" title="flower" isChecked={symptom.flower} />
            <Checkbox name="leaf" title="leaf" isChecked={symptom.leaf} />
            <Checkbox name="root" title="root" isChecked={symptom.root} />
            <Checkbox name="trunk" title="trunk" isChecked={symptom.trunk} />
          </div>
          <TextArea title="Description" value={symptom.description} limit={65535} name="description" />
          { selected ? (
            <div>
            Photos in CODA:
              <div style={{ display: 'flex' }}>
                {selectedPlantParts.map(plantPart => (
                  <SymptomPreview
                    key={plantPart}
                    style={{ width: '150px', margin: '20px' }}
                    symptom={symptom}
                    plantPart={plantPart}
                    description={`${symptom.label} on ${plantPart}`}
                  />
            ))}
              </div>
            </div>) : null
        }
          <button disabled={disabled} onClick={handleSubmit}>{symptom.id ? 'UPDATE' : 'SUBMIT'}</button>
        </form>
      </div>
    );
}

EditSymptoms.propTypes = {
  options: PropTypes.array,
};

export default EditSymptoms;