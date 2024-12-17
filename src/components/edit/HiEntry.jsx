import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { TextArea, RadioGroup } from '../shared/FormInputs';
import CAMap from '../shared/Map';
import { LIFE_STAGES, SITUATION, BOOLEANS } from './constants';
import HiSymptom from './HiSymptom';
import ButtonGroup from '../shared/ButtonGroup';

const HiEntry = ({
  agents, oaks, symptoms, selectedAgent, selectedOak, hi, plantParts, hiSymptoms, references,
  onAgentSelected, onOakSelected, getHi, onInputChange, onMultiInputChange,
  onBibSelectChange, onSubsiteSelectChange, onHisymptomMultiInputChange, onHisymptomRadioChange,
  onMapChange, onSymptomChange, onSymptomRemove, onHiSubmit, addHiSymptom, newHi,
}) => {
  hi && console.log("Hi from function HiEntry in HiEntry.jsx line 16=", hi);
  return (
    <div>
      <h3>Host-Agent Interactions</h3>
      <div className="text-muted">If your interaction requires a reference not currently in CODA, please visit the References tab and add it first.</div>
      <h4>Find an agent</h4>
      <Select
        options={agents}
        onChange={onAgentSelected}
        value={selectedAgent}
        placeholder="Type to search by species or common name"
        style={{ marginBottom: '15px' }}
      />
      <h4>Find an oak</h4>
      <Select
        options={oaks}
        onChange={onOakSelected}
        value={selectedOak}
        placeholder="Type to search by species or common name"
        style={{ marginBottom: '15px' }}
      />
      <button
        className="search-button"
        disabled={!(selectedAgent && selectedOak)}
        onClick={getHi}
      >
        Find my interaction!
      </button>
      {hi ? (
        <div>
          <RadioGroup title="Questionable record" selected={hi.questionable} name="questionable" options={BOOLEANS} onChange={onInputChange} />
          {/* we need to move the isPrimary field from hiSymptoms to hostInteractions it is for the record as a whole, 
          not for individual plant part symptoms below is the button that used to live in hiSymptoms */}
           {/* {<ButtonGroup title="Primary?" selected={symptom.isPrimary} name="isPrimary" options={PRIMARY} onClick={onButtonChange} /> */}
          <ButtonGroup title="Situation -choose one or more" selected={hi.situation} name="situation" options={SITUATION} onClick={onMultiInputChange} />
          <ButtonGroup title="Host life stages affected -choose one or more" selected={hi.hostLifeStage} name="hostLifeStage" options={LIFE_STAGES} onClick={onMultiInputChange} />
          <TextArea title="Notes" value={hi.notes} name="notes" limit={65535} onChange={onInputChange} />
          <h4>Range</h4>
          <p>Click to select/deselect counties</p>
          <div style={{ width: '400px', height: '400px' }}>
            <CAMap interactionRange={hi.countiesByRegions} agentRange={[]} onMapChange={onMapChange} editable />
          </div>
          <h4>References</h4>

          {hi.bibs.length ? null : <div className="text-muted">Add at least one reference to continue...</div>}
          <Select options={references} value={hi.bibs} onChange={onBibSelectChange} isMulti />
          {hiSymptoms.map(symptom => <HiSymptom symptom={symptom} symptoms={symptoms} key={symptom.id} onSelectChange={onSubsiteSelectChange} onButtonChange={onHisymptomMultiInputChange} onRadioChange={onHisymptomRadioChange} onSymptomChange={onSymptomChange} onSymptomRemove={onSymptomRemove} hiSymptoms={hiSymptoms} />)}

          <div>
            <b>Add Symptom: </b>
            {plantParts.map(plantPart => <button onClick={addHiSymptom} key={plantPart + hi.id} value={plantPart}>{plantPart}</button>)}
          </div>

          <button onClick={onHiSubmit} disabled={!hi.bibs.length}>{newHi ? 'Create' : 'Update'}</button>
        </div>
      ) : null}

    </div>

  );
}
HiEntry.propTypes = {
  agents: PropTypes.array,
  oaks: PropTypes.array,
  symptoms: PropTypes.array,
  selectedAgent: PropTypes.object,
  selectedOak: PropTypes.object,
  hi: PropTypes.object,
  newHi: PropTypes.bool,
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
  onSymptomRemove: PropTypes.func,
  addHiSymptom: PropTypes.func,
};

export default HiEntry;
