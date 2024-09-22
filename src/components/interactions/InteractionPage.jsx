import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { getInteraction } from "../../services/interactions";
import { getAgent } from "../../services/agents";
import { Spinner } from "../shared/shapes";
import {
  ScientificName,
  CommonName,
  AgentTaxonomy,
  Synonyms,
  Notes,
  CalPhotos,
} from "../shared/partials";
import Reference from "./Reference";
import Symptom from "./Symptom";
import CAMap from "../shared/Map";
import useInteraction from "../../hooks/useInteraction";
import useAgent from "../../hooks/useAgent";

const InteractionPage = () => {
  const { id } = useParams();

  const { interaction, isLoading: loading } = useInteraction(id);
  const { agent: agentData, isLoading: mapLoading } = useAgent(
    interaction?.agentId
  );

  if (loading) {
    return <Spinner />;
  }

  const { oak, agent } = interaction;

  const formattedDirect = interaction.directSymptoms.filter(
    (symptom) => symptom.plantPart
  );
  const formattedIndirect = interaction.indirectSymptoms.filter(
    (symptom) => symptom.plantPart
  );

  const directSymptoms = formattedDirect.length ? (
    <div>
      <h3>Symptoms at or near the site of attack:</h3>
      <ul>
        {formattedDirect.map((symptom) => (
          <Symptom key={symptom.id} symptom={symptom} />
        ))}
      </ul>
    </div>
  ) : null;

  const indirectSymptoms = formattedIndirect.length ? (
    <div>
      <h3>Symptoms found away from site of attack:</h3>
      <ul>
        {formattedIndirect.map((symptom) => (
          <Symptom key={symptom.id} symptom={symptom} />
        ))}
      </ul>
    </div>
  ) : null;

  const noSymptoms =
    !directSymptoms && !indirectSymptoms ? (
      <div>
        <h3>No symptom data available.</h3>
      </div>
    ) : null;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        {/* Range map */}
        <div style={{ float: "right" }}>
          <h3>Reported agent range</h3>
          {mapLoading ? (
            <Spinner />
          ) : (
            <CAMap
              interactionRange={interaction.range}
              agentRange={agentData.rangeData}
            />
          )}
        </div>
        {/* Data on this interaction */}
        <div>
          <h3>
            Host:{" "}
            <Link to={`/oaks/${oak.id}`}>
              <ScientificName
                inline
                genus={oak.genus}
                species={oak.species}
                subSpecies={oak.subSpecies}
                authority={oak.authority}
              />
            </Link>
          </h3>
          <p />
          {oak.commonName && <CommonName commonName={oak.commonName} />}
        </div>
        <div>
          <b>Host life stage(s) affected:</b> {interaction.hostLifeStage}
        </div>
        <div>
          <h3>
            Agent:{" "}
            <Link to={`/agents/${agent.id}`}>
              <ScientificName
                inline
                genus={agent.genus}
                species={agent.species}
                subSpecies={agent.subSpecies}
                authority={agent.authority}
              />
            </Link>
          </h3>
          <p />
          {agent.commonName && <CommonName commonName={agent.commonName} />}
          <CalPhotos genus={agent.genus} species={agent.species} />
          <p />
          <AgentTaxonomy agent={agent} />
          <p />
          <Synonyms synonyms={agent.synonyms} />
        </div>
        {interaction.questionable ? (
          <div className="cite-details"> Questionable ID </div>
        ) : null}
        <p />
        {directSymptoms}
        {indirectSymptoms}
        {noSymptoms}
        {interaction.notes ? <Notes notes={interaction.notes} /> : null}
        <h3>
          References: <small>(click to expand)</small>
        </h3>
        {interaction.bibs.map((cite) => (
          <Reference key={cite.id} cite={cite} />
        ))}
      </div>
    </div>
  );
};

InteractionPage.propTypes = {
  match: PropTypes.object,
};

export default InteractionPage;
