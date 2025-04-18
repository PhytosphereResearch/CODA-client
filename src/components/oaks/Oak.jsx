import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { ScientificName, CommonName, CalPhotos, Notes } from '../shared/partials';
import { Spinner } from '../shared/shapes';
import useOak from '../../hooks/useOak';

const Oak = () => {
  const { id } = useParams();
  const { isLoading: loading, oak } = useOak(id)

  if (!oak && !loading) {
    return null;
  } else if (loading) {
    return <Spinner />;
  }
  let subGenus = (
    <p>
      <b>Subgenus-Section-Subsection:</b> {oak.subGenus}
    </p>
  );
  let evergreen = (
    <p>{oak.evergreen}.</p>
  );
  let treeForm = (
    <p>{oak.treeForm} <span> {oak.height}.</span></p>
  );
  let range = (
    <div><b>Range</b><br />
      {oak.distribution} <br />
    </div>
  );

  return (
    <div>
      <ScientificName genus={oak.genus} species={oak.species} subSpecies={oak.subSpecies} authority={oak.authority} />
      {oak.commonName ? <CommonName commonName={oak.commonName} /> : null}
      {oak.subGenus ? subGenus : null}
      {oak.evergreen ? evergreen : null}
      {oak.treeForm || oak.height ? treeForm : null}
      <p>{oak.leaves}</p>
      <p>{oak.stems}</p>
      <p>{oak.acorns}</p>

      {oak.range ? range : null}
      <p>{oak.hybrids}</p>
      <p>{oak.varieties}</p>
      <p>{' '}</p>
      <CalPhotos genus={oak.genus} species={oak.species} />
      <p>{' '}</p>
      <p>
        <b>Range map:</b> <a href={`https://plants.usda.gov/plant-profile/${oak.usdaCode}`} target="_blank">Search USDA Plants Database</a>
      </p>
      {oak.notes ? <Notes notes={oak.notes} /> : null}
    </div>
  );
}

export default Oak;
