import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  ScientificName,
  CommonName,
  Synonyms,
  CalPhotos,
  Notes,
  AgentTaxonomy,
  DefaultCitation,
  AuditRecord,
} from "../shared/partials";
import { Spinner } from "../shared/shapes";
import CAMap from "../shared/Map";
import useAgent from "../../hooks/useAgent";
import sortByScientificName from "../../utils/sortByScientificName";

const Agent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading: loading, agent } = useAgent(id);

  const goToHostInteraction = (e) => {
    const interactionId = e.target.getAttribute("data-interaction");
    navigate(`/hi/interaction/${interactionId}`, { replace: true });
  };

  if (!agent && !loading) {
    return null;
  } else if (loading) {
    return <Spinner />;
  }

  const hosts = agent?.hosts && (
    <div>
      <b>Hosts: </b>
      {agent.hosts.sort(sortByScientificName).map((h, index) => (
        <span key={h.genus + h.species}>
          <a style={{ cursor: "pointer" }} onClick={goToHostInteraction}>
            <i data-interaction={h.interactionId}>
              {h.genus} {h.species}
              {h.subSpecies ? " " : ""}
              {h.subSpecies}
            </i>
          </a>
          {index < agent.hosts.length - 1 ? ", " : ""}
        </span>
      ))}
      <div className="text-muted">Click an oak to see interaction details</div>
    </div>
  );

  return (
    <div>
      <ScientificName
        genus={agent.primarySynonym?.genus}
        species={agent.primarySynonym?.species}
        subSpecies={agent.primarySynonym?.subSpecies}
        authority={agent.primarySynonym?.authority}
      />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
        <div>
          <p />
          {agent.commonName ? (
            <CommonName commonName={agent.commonName} />
          ) : null}
          <CalPhotos
            genus={agent.primarySynonym?.genus}
            species={agent.primarySynonym?.species}
          />
          <p />
          <Synonyms synonyms={agent.otherSynonyms} />
          <p />
          {agent.synonyms?.map((synonym) =>
            synonym.notes ? (
              <div key={synonym.notes}>{synonym.notes}</div>
            ) : null
          )}
          <p />
          <AgentTaxonomy agent={agent} />
          <p />
          {hosts}
          <p />
          {agent.notes ? <Notes notes={agent.notes} /> : null}
          <p>
            <b>Record history:</b>
            {agent.originalCodaRecord ? <DefaultCitation /> : null}
            {agent.auditRecords.map((auditRecord) => (
              <AuditRecord key={auditRecord.id} auditRecord={auditRecord} />
            ))}
          </p>
        </div>
        <div>
          <b>Reported range</b> <br />
          <CAMap interactionRange={[]} agentRange={agent.rangeData} />
        </div>
      </div>
    </div>
  );
};

export default Agent;
