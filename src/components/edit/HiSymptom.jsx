import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { RadioGroup, EnhancedCreatable } from '../shared/FormInputs';
import ButtonGroup from '../shared/ButtonGroup';
import { PRIMARY, BOOLEANS, MATURITIES } from './constants';
import { getSubSites } from '../../services/interactions';

const HiSymptom = (props) => {

  const [subSites, setSubsites] = useState([]);
  const { id, plantPart } = props.symptom;

  useEffect(() => {
    getSubSites().then(subSites => {
      const subsiteValues = subSites.map(s => ({ label: s, value: s}));
      setSubsites(subsiteValues);
    })
  }, [])

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
    const symptomList = symptom.symptoms.map(s => s.id);
    return (
      <div>
        <h3>
          <span>
            {typeof id !== 'number' ? <button onClick={onSymptomRemove}> X </button> : null}
            {`${symptom.plantPart} symptoms`}
          </span>
        </h3>
        <Select
          options={symptoms}
          onChange={onSymptomChange}
          value={symptomList}
          placeholder="Type to search by symptom"
          style={{ marginBottom: '15px' }}
          multi
        />
        <RadioGroup
          key={symptom.id}
          title="Is Indirect?"
          selected={symptom.isIndirect}
          name={`isIndirect&${symptom.id}`}
          options={BOOLEANS}
          onChange={onRadioChange}
        />
        <ButtonGroup title="Primary?" selected={symptom.isPrimary} name="isPrimary" options={PRIMARY} onClick={onButtonChange} />
        <ButtonGroup title="Maturity" name="maturity" selected={symptom.maturity} options={MATURITIES} onClick={onButtonChange} />
        <EnhancedCreatable
          title="SubSites"
          name="subSites"
          value={symptom.subSite}
          onChange={onSelectChange}
          options={subSites}
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