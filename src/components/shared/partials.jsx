import React from 'react';
import PropTypes from 'prop-types';

export const DefaultCitation = () => (
  <div>
    Created/edited by T.J. Swiecki & E.A. Bernhardt (1988-2024) and/or R.A.
    Arnold (1988-1990).
  </div>
);

export const AuditRecord = ({ auditRecord }) => {
  return (
    <div>
      {auditRecord.action === 'update' ? 'Edited by' : 'Created by'}{' '}
      {auditRecord.user_id}{' '}
      {new Date(auditRecord.date_time).toLocaleDateString('en-US')}{' '}
      {new Date(auditRecord.date_time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </div>
  );
};

export const ScientificName = ({
  genus,
  species,
  subSpecies,
  authority,
  notes,
  inline,
  style,
}) => (
  <div
    style={{ ...style, display: inline ? 'inline-block' : 'block' }}
    className="scientific-name"
  >
    <i>
      {genus} {species} {subSpecies}
    </i>{' '}
    <span className="authority">{authority}</span>
    {notes ? (
      <div
        className="scientific-name.notes"
        style={{ paddingLeft: '10px', fontSize: '15px' }}
      >
        {' '}
        &mdash; {notes}
      </div>
    ) : null}
  </div>
);

ScientificName.propTypes = {
  genus: PropTypes.string,
  species: PropTypes.string,
  subSpecies: PropTypes.string,
  authority: PropTypes.string,
  notes: PropTypes.string,
  inline: PropTypes.bool,
  style: PropTypes.object,
};

export const CommonName = ({ commonName }) => (
  <div>
    <b>Common name(s):</b> {commonName}
  </div>
);

CommonName.propTypes = {
  commonName: PropTypes.string,
};

export const CalPhotos = ({ genus, species }) => (
  <div>
    <b>Images:</b>{' '}
    <a
      href={`https://calphotos.berkeley.edu/cgi/img_query?where-taxon=${genus}+${species}`}
      target="_blank"
    >
      Search CalPhotos
    </a>
  </div>
);

CalPhotos.propTypes = {
  genus: PropTypes.string,
  species: PropTypes.string,
};

export const BookLink = ({ bookLink }) => (
  <div style={{ marginLeft: '57px' }}>
    <a href={`${bookLink}`} target="_blank">
      Field Guide to Insects and Diseases of California Oaks
    </a>
  </div>
);
BookLink.propTypes = {
  bookLink: PropTypes.string,
};

export const AgentTaxonomy = ({ agent }) => (
  <div className="taxonomy">
    <div>
      <b>
        Taxonomy: {agent.type} &mdash;{' '}
        {agent.subType ? <span> {agent.subType} </span> : ''}{' '}
        {agent.subSubType ? <span>&mdash; {agent.subSubType}</span> : ''}
      </b>
    </div>
    <div style={{ marginLeft: '10px' }}>
      {agent.torder ? (
        <span>
          <b>Order: </b>
          {agent.torder} <br />
        </span>
      ) : null}
      {agent.family ? (
        <span>
          <b>Family: </b>
          {agent.family} <br />
        </span>
      ) : null}
    </div>
  </div>
);

AgentTaxonomy.propTypes = {
  agent: PropTypes.object,
};

export const Notes = ({ notes }) => (
  <div>
    <b>Notes:</b>{' '}
    {notes.split('\n').map((note) => (
      <div key={note}>{note}</div>
    ))}
  </div>
);

Notes.propTypes = {
  notes: PropTypes.string,
};

export const Synonyms = ({ synonyms }) =>
  synonyms.length ? (
    <div>
      <b>Synonyms:</b>
      <ul className="synonyms">
        {synonyms.map((s, index) => (
          <li
            style={{ paddingLeft: '10px' }}
            key={s.genus + s.species + s.subSpecies + s.authority}
          >
            <i data-synonym={index}>
              {s.genus} {s.species} {s.subSpecies}
            </i>{' '}
            {s.authority} {s.notes ? <span>&mdash; {s.notes}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

Synonyms.propTypes = {
  synonyms: PropTypes.array,
};
