import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import useSWRMutation from 'swr/mutation';
import { TextInput, TextArea } from '../shared/FormInputs';
import { addOrUpdateReference } from '../../services/interactions';

const blankRef = {
  year: '',
  description: '',
  author: '',
  title: '',
  source: '',
  notes: '',
};

const EditReferences = (props) => {
  const [selected, setSelected] = useState();
  const [reference, setReference] = useState({...blankRef});
  const { getAccessTokenSilently } = useAuth0();
  const { trigger: update } = useSWRMutation('/api/references', addOrUpdateReference)

  const onRefSelected = (option) => {
    if (!option) {
      setSelected(undefined);
      setReference({...blankRef})
      return;
    }
    setSelected(option);
    setReference({...option});
  }

  const onInputChange = (e) => {
    const updatedReference = { ...reference, [e.target.name]: e.target.value };
    setReference(updatedReference);
  }

  const handleSubmit = async () => {
    const updatedReference = { ...reference };
    const accessToken = await getAccessTokenSilently();
    update({ reference: updatedReference, accessToken })
      .then(() => {
        setSelected(undefined);
        setReference({...blankRef});
      });
  }

    const { options } = props;
    return (
      <div>
        <h3>References</h3>
        <Select
          options={options}
          onChange={onRefSelected}
          value={selected}
          placeholder="Type here to search for existing references"
          style={{ marginBottom: '15px' }}
        />
        <h4>{selected ? 'Edit a Reference:' : 'Add a Reference:'}</h4>
        <form onSubmit={handleSubmit} onChange={onInputChange}>
          <TextInput title="Year" placeholder="YYYY" value={reference.year} name="year" />
          <TextInput title="Description" hintText="Authors (YYYY) for journal short citation otherwise short title, e.g. Bregant et al. (2021) Forests 12:682. " value={reference.description} name="description" />
          <TextInput title="Author" value={reference.author} name="author" />
          <TextArea title="Title" value={reference.title} name="title" />
          <TextArea title="Source" value={reference.source} name="source" />
          <TextArea title="Notes" value={reference.notes} name="notes" />
        </form>
        <button onClick={handleSubmit}>{reference.id ? 'UPDATE' : 'SUBMIT'}</button>
      </div>
    );
}

EditReferences.propTypes = {
  refresh: PropTypes.func,
  options: PropTypes.array,
};

export default EditReferences;