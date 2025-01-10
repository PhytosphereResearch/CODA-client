import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { RadioGroup, EnhancedCreatable } from '../shared/FormInputs';
import ButtonGroup from '../shared/ButtonGroup';
import { PRIMARY, BOOLEANS, MATURITIES } from './constants';
import useSubSites from '../../hooks/useSubSites';

const HiSymptom = (props) => {
  const { subSites } = useSubSites()
  const subsiteValues = subSites?.map(s => ({ label: s, value: s }));

  const { id, plantPart } = props.symptom;

  const onSelectChange = (options) => {

    props.onSelectChange(id, options);
  }

  const onButtonChange = (e) => {
    props.onButtonChange(e, id);
  }


  const onRadioChange = (e) => {
    props.onRadioChange(e, id);
  }

  const onSymptomChange = (e) => {
    props.onSymptomChange(id, e);
   }

  const onSymptomRemove = () => {
    props.onSymptomRemove(id, plantPart);
  }

  const { symptom, symptoms } = props;

  const symptomList = symptom.symptoms.map(s => ({ ...s, value: s.id, label: s.symptom }));
  return (
    <div>
      <h3>
        <span>
          {typeof id !== 'number' ? <button onClick={onSymptomRemove}> X </button> : null}
          {`${symptom.plantPart} symptoms`}
        </span>
      </h3>
      <Select
        options={symptoms.filter(s=>s[symptom.plantPart])}
        onChange={onSymptomChange}
        value={symptomList}
        placeholder="Type to search by symptom"
        style={{ marginBottom: '15px' }}
        isMulti
      />
      <RadioGroup
        key={symptom.id}
        title="Is Indirect?"
        selected={symptom.isIndirect}
        name={`isIndirect&${symptom.id}`}
        options={BOOLEANS}
        onChange={onRadioChange}
      />
 
      <ButtonGroup title="Maturity / condition of affected plant part" name="maturity" selected={symptom.maturity} options={MATURITIES} onClick={onButtonChange} />
     

  <EnhancedCreatable
        title="SubSites"
        name="subSites"
        value={symptom.subSite}
        onChange={onSelectChange}
        options={subsiteValues}
        multi
      />
    </div>
  );
}

HiSymptom.propTypes = {
  symptom: PropTypes.object,
  symptoms: PropTypes.array,
  onSelectChange: PropTypes.func,
  onButtonChange: PropTypes.func,
  onRadioChange: PropTypes.func,
  onSymptomChange: PropTypes.func,
  onSymptomRemove: PropTypes.func,
};

export default HiSymptom;