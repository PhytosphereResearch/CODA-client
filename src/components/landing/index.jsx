import React, { Component } from "react";
import autobind from 'react-autobind';
import Logo from '../logo.jsx';
import SearchingCoda from './SearchingCoda.jsx';
import About from './About.jsx';
import Citing from './Citing.jsx';
import Questions from './Questions.jsx';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: {
        searchInfo: false,
        about: false,
        citing: false,
        questions: false
      }
    }
    autobind(this)
  }

  openModal(name) {
    let show = { ...this.state.show };
    show[name] = true;
    this.setState({ show })
  }

  handleCloseModal(name) {
    let show = { ...this.state.show };
    show[name] = false;
    this.setState({ show })
  }

  render() {
    return (
      <div>
        <div className="landing-wrapper">
          <div className="landing-overlay">
            <div className="logo-large"><Logo /></div>
            <div className="subtitle">
              California Oak Disease and Arthropod Database
            </div>
          </div>
          <img src="../images/rockville_hills.jpg" alt="" className="landing" />
        </div>
        <div className="card">
          The <b> California Oak Disease and Arthropod  host index database (CODA)</b> is a comprehensive compilation of the many agents that affect oaks in California.  A wide variety of insects, pathogens, and other agents can colonize oaks. Only a small number of these can cause serious damage, but many can cause noticeable symptoms.  CODA is a tool that can be used to help identify agents that cause symptoms on oaks in California.
          <br />
          CODA includes information on:
          <ul>
            <li>
              <b>53</b> oak (<i>Quercus</i>) species, varieties, and hybrids, including both California natives and introduced species grown in cultivation
            </li>
            <li>
              <b>1278</b> agents (arthropods, microorganisms, and abiotic factors) that damage, feed on, or colonize oaks
            </li>
            <li>
              <b>2657</b> unique host-agent interactions
            </li>
            <li>
              <b>79</b> symptoms of host-agent interactions including detailed descriptions and photos
            </li>
          </ul>

          <p>
            <b><a href="../publications/Fieldguide.htm">A field guide to insects and diseases of California oaks</a></b> has descriptions and photos of some of the most common and conspicuous diseases and arthropods, based on information in CODA and other sources. </p>
          <br />
            <ul className="home-links">
              <li><a onClick={() => this.openModal('searchInfo')}>Searching CODA</a></li>
              <li><a onClick={() => this.openModal('about')}>About CODA</a></li>
              <li><a onClick={() => this.openModal('citing')}>Citing CODA </a></li>
              <li><a onClick={() => this.openModal('questions')}>Questions</a></li>
            </ul>
            <SearchingCoda show={this.state.show.searchInfo} handleCloseModal={() => this.handleCloseModal('searchInfo')} />
            <About show={this.state.show.about} handleCloseModal={() => this.handleCloseModal('about')} />
            <Citing show={this.state.show.citing} handleCloseModal={() => this.handleCloseModal('citing')} />
            <Questions show={this.state.show.questions} handleCloseModal={() => this.handleCloseModal('questions')} />
          </div>
      </div>
    );
  }
}
