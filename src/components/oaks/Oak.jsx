import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getOak } from 'coda/services/oaks';
import { ScientificName, CommonName, CalPhotos, Notes } from '../shared/partials';
import { Spinner } from '../shared/shapes';

export default class Oak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    getOak(this.props.match.params.id)
      .then(oak => this.setState({ oak, loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    // don't reload the oak we just loaded
    if (this.props.match.params.id === nextProps.match.params.id) {
      return;
    }
    getOak(nextProps.match.params.id)
      .then(oak => this.setState({ oak }));
  }

  render() {
    let { oak, loading } = this.state;
    if (!oak && !loading) {
      return null;
    } else if (loading) {
      return <Spinner />;
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
    );
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
        <p>{' '}</p>
        <CalPhotos genus={oak.genus} species={oak.species} />
        <p>{' '}</p>
        <p>
          <b>Range map:</b> <a href={`http://plants.usda.gov/core/profile?symbol=${oak.code}`} target="_blank">Search USDA Plants Database</a>
        </p>
        { oak.notes ? <Notes notes={oak.notes} /> : null }
      </div>
    );
  }
}

Oak.propTypes = {
  match: PropTypes.object
};
