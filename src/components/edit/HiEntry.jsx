import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-virtualized-select';
import { TextInput, RadioGroup } from '../shared/FormInputs';
import CAMap from './Map';
import { LIFE_STAGES, SITUATION, BOOLEANS } from './constants';
import HiSymptom from './HiSymptom';
import ButtonGroup from '../shared/ButtonGroup';

const HiEntry = ({
  agents, oaks, symptoms, selectedAgent, selectedOak, hi, plantParts, hiSymptoms, references,
  onAgentSelected, onOakSelected, getHi, onInputChange, onMultiInputChange,
  onBibSelectChange, onSubsiteSelectChange, onHisymptomMultiInputChange, onHisymptomRadioChange,
  onMapChange, onSymptomChange, onHiSubmit, addHiSymptom,
}) =>
  (
    <div>
      <h3>Host-Agent Interactions</h3>
      <h4>Find an agent</h4>
      <Select
        options={agents}
        onChange={onAgentSelected}
        value={selectedAgent}
        placeholder="Search by synonym"
        style={{ marginBottom: '15px' }}
      />
      <h4>Find an oak</h4>
      <Select
        options={oaks}
        onChange={onOakSelected}
        value={selectedOak}
        placeholder="Search by species or common name"
        style={{ marginBottom: '15px' }}
      />
      <button
        className="search-button"
        disabled={!(selectedAgent && selectedOak)}
        onClick={getHi}
      >
        Find my interaction!
      </button>
      { hi ? (
        <div>
          <RadioGroup title="Questionable" selected={hi.questionable} name="questionable" options={BOOLEANS} onChange={onInputChange} />
          <ButtonGroup title="Situation" selected={hi.situation} name="situation" options={SITUATION} onClick={onMultiInputChange} />
          <ButtonGroup title="Host Life Stage" selected={hi.hostLifeStage} name="hostLifeStage" options={LIFE_STAGES} onClick={onMultiInputChange} />
          <TextInput title="Notes" value={hi.notes} name="notes" onChange={onInputChange} />
          <h4>Range</h4>
          <CAMap countyRange={hi.countiesByRegions} onMapChange={onMapChange} />
          <h4>References</h4>
          <Select options={references} value={hi.bibs} onChange={onBibSelectChange} multi />
          {hiSymptoms.map(symptom => <HiSymptom symptom={symptom} symptoms={symptoms} key={symptom.id} onSelectChange={onSubsiteSelectChange} onButtonChange={onHisymptomMultiInputChange} onRadioChange={onHisymptomRadioChange} onSymptomChange={onSymptomChange} />)}
          <div>
            <b>Add Symptom: </b>
            {plantParts.map(plantPart => <button onClick={addHiSymptom} key={plantPart + hi.id} value={plantPart}>{plantPart}</button>)}
          </div>
          <button onClick={onHiSubmit}>Update</button>
        </div>
    ) : null}

    </div>
  );
HiEntry.propTypes = {
  agents: PropTypes.array,
  oaks: PropTypes.array,
  symptoms: PropTypes.array,
  selectedAgent: PropTypes.object,
  selectedOak: PropTypes.object,
  hi: PropTypes.object,
  hiSymptoms: PropTypes.array,
  references: PropTypes.array,
  onAgentSelected: PropTypes.func,
  onOakSelected: PropTypes.func,
  getHi: PropTypes.func,
  onInputChange: PropTypes.func,
  onMultiInputChange: PropTypes.func,
  onBibSelectChange: PropTypes.func,
  onSubsiteSelectChange: PropTypes.func,
  onHisymptomMultiInputChange: PropTypes.func,
  onHisymptomRadioChange: PropTypes.func,
  onMapChange: PropTypes.func,
  onHiSubmit: PropTypes.func,
  plantParts: PropTypes.array,
  onSymptomChange: PropTypes.func,
  addHiSymptom: PropTypes.func,
};

export default HiEntry;
