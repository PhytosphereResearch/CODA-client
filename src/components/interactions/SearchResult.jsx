import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchResult extends Component {
  render(){
    let interaction = this.props
    return <div>This is interaction number { interaction.id }</div>)
  }
}

SearchResult.propTypes = { interaction: PropTypes.object }
