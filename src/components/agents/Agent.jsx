import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ScientificName, CommonName, Synonyms, CalPhotos, Notes, AgentTaxonomy } from '../shared/partials';
import { getAgent } from '../../services/agents';
import { Spinner } from '../shared/shapes';
import CAMap from '../shared/Map';

const Agent = () => {
  const [ loading, setLoading ] = useState(true);
  const [agent, setAgent] = useState({});

const navigate = useNavigate();
const { id } = useParams();


  useEffect(() => {
    setLoading(true);
    getAgent(id).then(agent => {
      console.log('agent', agent)
      setAgent(agent);
      setLoading(false);
    })
  }, [id])

  const goToHostInteraction = (e) => {
    const interactionId = e.target.getAttribute('data-interaction');
    navigate(`/hi/interaction/${interactionId}`, {replace: true});
  }

    if (!agent && !loading) {
      return null;
    } else if (loading) {
      return <Spinner />;
    }

    const hosts = agent?.hosts && (
      <div>
        <b>Hosts: </b>
        {agent.hosts.map((h, index) => (
          <span key={h.genus + h.species}>
            <a style={{ cursor: 'pointer' }} onClick={goToHostInteraction}>
              <i data-interaction={h.interactionId}>
                {h.genus} {h.species}{h.subSpecies ? ' ' : ''}{h.subSpecies}
              </i>
            </a>
            {index < agent.hosts.length - 1 ? ', ' : ''}
          </span>
        ))}
        <div className="text-muted">Click an oak to see interaction details</div>
      </div>
    );

    return (
      <div>
        <ScientificName genus={agent.primarySynonym?.genus} species={agent.primarySynonym?.species} subSpecies={agent.primarySynonym?.subSpecies} authority={agent.primarySynonym?.authority} />
        <div style={{ clear: 'both' }}>
          {/* <div style={{ flex: '1' }}> */}
          <div style={{ float: 'right' }}><b>Reported range</b> <br />
            <CAMap interactionRange={[]} agentRange={agent.rangeData} />
          </div>
          <p />
          { agent.commonName ? <CommonName commonName={agent.commonName} /> : null }
          <CalPhotos genus={agent.primarySynonym?.genus} species={agent.primarySynonym?.species} />
          <p />
          <Synonyms synonyms={agent.otherSynonyms} />
          <p />
          {agent.synonyms?.map(synonym => (synonym.notes ? <div key={synonym.notes}>{synonym.notes}</div> : null))}
          <p />
          <AgentTaxonomy agent={agent} />
          <p />
          {hosts}
          <p />
          { agent.notes ? <Notes notes={agent.notes} /> : null }
        </div>
      </div>
    );
  }

  export default Agent;