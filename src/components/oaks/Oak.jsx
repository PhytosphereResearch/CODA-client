import React, { Component } from 'react';

export default class Oak extends Component {
  render() {
    let { oak } = this.props
    return (
      <div>
        <h3><i>{oak.genus} {oak.species}</i> {oak.subSpecies} <span className="authority">{oak.authority}</span></h3>
        <p>
          <b>Common name(s):</b> {oak.commonName}
        </p>
        <b>Sub-genus:</b> {oak.subGenus} <br />

        <br />
        <p>{oak.evergreen}.</p>
        <p>{oak.treeForm} <span> {oak.height}.</span></p>
        <p>{oak.leaves}</p>
        <p>{oak.stems}</p>
        <p>{oak.acorns}</p>

        <div><b>Range</b><br />
          {oak.distribution} <br />
        </div>
        <p>{oak.hybrids}</p>
        <p>{oak.varieties}</p>
        <p>
          <b>Images:</b>
          <a href={`http://calphotos.berkeley.edu/cgi/img_query?where-taxon=${oak.genus}+${oak.species}`} target="_blank">Search CalPhotos</a>
        </p>
        <p>
          <b>Range map:</b> <a href={`http://plants.usda.gov/core/profile?symbol=${oak.code}`} target="_blank">Search USDA Plants Database</a>
        </p>
        <div>
          <p><b>Notes:</b></p>
          <p>{oak.notes}</p>
        </div>
      </div>
    )
  }
}
