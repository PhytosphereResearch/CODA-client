import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
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

const initialState = {
  selected: undefined,
  reference: { ...blankRef },
};

const EditReferences = (props) => {
  const [selected, setSelected] = useState();
  const [reference, setReference] = useState({...blankRef});

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

  const handleSubmit = () => {
    const updatedReference = { ...reference };
    addOrUpdateReference(updatedReference)
      .then(props.refresh)
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
          placeholder="Type to search by reference"
          style={{ marginBottom: '15px' }}
        />
        <h4>{selected ? 'Edit a Reference:' : 'Add a Reference:'}</h4>
        <form onSubmit={handleSubmit} onChange={onInputChange}>
          <TextInput title="Year" placeholder="YYYY" value={reference.year} name="year" />
          <TextInput title="Description" hintText="Authors (YYYY) for journal short citation otherwise short title" value={reference.description} name="description" />
          <TextInput title="Author" value={reference.author} name="author" />
          <TextInput title="Title" value={reference.title} name="title" />
          <TextInput title="Source" value={reference.source} name="source" />
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