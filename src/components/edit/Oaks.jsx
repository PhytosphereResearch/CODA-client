import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import useSWRMutation from 'swr/mutation';
import { useAuth0 } from "@auth0/auth0-react";
import { getOak, addOrUpdateOak } from '../../services/oaks';
import { TextInput, TextArea } from '../shared/FormInputs';
import { FullScreenSpinner } from '../shared/shapes';
import { pickBy } from 'lodash';

const blankOak = {
  genus: '',
  subGenus: '',
  species: '',
  subSpecies: '',
  commonName: '',
  authority: '',
  evergreen: '',
  acorns: '',
  leaves: '',
  stems: '',
  treeForm: '',
  height: '',
  distribution: '',
  hybrids: '',
  varieties: '',
  notes: '',
  usdaCode: '',
};

const EditOaks = (props) => {
  const [selected, setSelected] = useState();
  const [selectedOak, setSelectedOak] = useState({ ...blankOak });
  const { getAccessTokenSilently } = useAuth0();

  const { trigger: update, isMutating: loading, error } = useSWRMutation('/api/oaks', addOrUpdateOak)

  const onOakSelected = (option) => {
    if (!option.value) {
      setSelected(null);
      setSelectedOak({ ...blankOak });
      return;
    }
    setSelected(option);
    getOak(option.value)
      .then(oak => setSelectedOak(oak));
  }

  const onInputChange = (e) => {
    const oak = { ...selectedOak, [e.target.name]: e.target.value };
    setSelectedOak(oak);
  }

  const onSubmit = async () => {
    const accessToken = await getAccessTokenSilently()
    update({ oak: selectedOak, accessToken }).then(() => {
      setSelectedOak({ ...blankOak });
      setSelected(undefined);
    })
  }

  const { options } = props;

  return (
    <div>
      <h3>Oaks</h3>
      <Select
        options={options}
        onChange={onOakSelected}
        value={selected}
        placeholder="Type in this box or scroll to search the database for oaks by species or common name"
        style={{ marginBottom: '15px' }}
      />
    <p>Add an oak</p>
      <div>
        {loading ? <FullScreenSpinner /> : null}
        <div style={{ display: 'flex', gap: '8px' }}>
          <TextInput title="Genus" value={selectedOak.genus} name="genus" onChange={onInputChange} />
          <TextInput title="Species" value={selectedOak.species} name="species" onChange={onInputChange} />
          <TextInput title="Sub-species" value={selectedOak.subSpecies} name="subSpecies" onChange={onInputChange} />
          <TextInput title="Taxonomic authority" value={selectedOak.authority} name="authority" onChange={onInputChange} />
        </div>
        <TextInput title="Subgenus-Section-Subsection (Taxonomy from  Forests 2021, 12(6), 786; https://doi.org/10.3390/f12060786)" value={selectedOak.subGenus} name="subGenus" onChange={onInputChange} />
        <TextInput title="Common name" value={selectedOak.commonName} name="commonName" onChange={onInputChange} />
        <TextInput title="Leaf retention (Evergreen, Semi-evergreen, Deciduous, Semi-deciduous, or a combination of these)" value={selectedOak.evergreen} name="evergreen" onChange={onInputChange} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <TextInput title="Form (tree or shrub and shape)" value={selectedOak.treeForm} name="treeForm" onChange={onInputChange} />
          <TextInput title="Height range, meters (m)" value={selectedOak.height} name="height" onChange={onInputChange} />
        </div>
        <TextArea title="Leaves (description)" limit={500} value={selectedOak.leaves} name="leaves" onChange={onInputChange} />
        <TextArea title="Stems (description)" value={selectedOak.stems} name="stems" onChange={onInputChange} />
        <TextArea title="Acorns (description)" value={selectedOak.acorns} name="acorns" onChange={onInputChange} />
        <TextInput title="Hybrids (list of known hybrids)" value={selectedOak.hybrids} name="hybrids" onChange={onInputChange} />
        <TextInput title="Varieties (list of described varieties)" value={selectedOak.varieties} name="varieties" onChange={onInputChange} />
        <TextInput title="USDA species code (from plants.usda.gov)" limit={10} value={selectedOak.usdaCode} name="usdaCode" onChange={onInputChange} />
        <TextArea title="Distribution (geographic and elevation range, habitat or soil notes)" limit={500} value={selectedOak.distribution} name="distribution" onChange={onInputChange} />
        <TextArea title="Notes (other characters or information of interest)" value={selectedOak.notes} limit={65535} name="notes" onChange={onInputChange} />
        <button onClick={onSubmit}>{selectedOak.id ? 'UPDATE' : 'SUBMIT'}</button>

      </div>
    </div>
  );
}

EditOaks.propTypes = {
  options: PropTypes.array,
};

export default EditOaks;