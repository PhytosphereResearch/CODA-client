import React, { Component } from 'react';
import { getOak } from 'coda/services/oaks';
import { ScientificName, CommonName, Notes } from '../shared/partials.jsx';

export default class Oak extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    getOak(this.props.match.params.id)
      .then(oak => this.setState({ oak }))
  }

  componentWillReceiveProps(nextProps) {
    // don't reload the oak we just loaded
    if (this.props.match.params.id === nextProps.match.params.id) {
      return;
    }
    getOak(nextProps.match.params.id)
      .then(oak => this.setState({ oak }))
  }

  render() {
    let { oak } = this.state;
    if (!oak) {
      return null;
    }
    let subGenus = (
      <p>
        <b>Sub-genus:</b> {oak.subGenus}
      </p>
    );
    let evergreen = (
      <p>{oak.evergreen}.</p>
    );
    let treeForm = (
      <p>{oak.treeForm} <span> {oak.height}.</span></p>
    )
    let range = (
      <div><b>Range</b><br />
        {oak.distribution} <br />
      </div>
    );

    return (
      <div>
        <ScientificName genus={oak.genus} species={oak.species} subSpecies={oak.subSpecies} authority={oak.authority} />
        { oak.commonName ? <CommonName commonName={oak.commonName} /> : null }
        { oak.subGenus ? subGenus : null }
        { oak.evergreen ? evergreen : null }
        { oak.treeForm || oak.height ? treeForm : null }
        <p>{oak.leaves}</p>
        <p>{oak.stems}</p>
        <p>{oak.acorns}</p>

        { oak.range ? range : null }
        <p>{oak.hybrids}</p>
        <p>{oak.varieties}</p>
        <p>
          <b>Images:</b>{" "}
          <a href={`http://calphotos.berkeley.edu/cgi/img_query?where-taxon=${oak.genus}+${oak.species}`} target="_blank">Search CalPhotos</a>
        </p>
        <p>
          <b>Range map:</b> <a href={`http://plants.usda.gov/core/profile?symbol=${oak.code}`} target="_blank">Search USDA Plants Database</a>
        </p>
        { oak.notes ? <Notes notes={oak.notes} /> : null }
      </div>
    )
  }
}
