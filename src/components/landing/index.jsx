import React, { useState } from 'react';
import Modal from 'react-modal';
import Logo from '../logo';
import SearchingCoda from './SearchingCoda';
import About from './About';
import Citing from './Citing';
import Questions from './Questions';

Modal.setAppElement('#root');

const Landing = () => {
  const [show, setShow] = useState({
    searchInfo: false,
    about: false,
    citing: false,
    questions: false,
  });

  const openModal = (name) => {
    const updatedShow = { ...show };
    updatedShow[name] = true;
    setShow(updatedShow);
  };

  const handleCloseModal = (name) => {
    const updatedShow = { ...show };
    updatedShow[name] = false;
    setShow(updatedShow);
  };

  return (
    <div>
      <div className="landing-wrapper">
        <div className="landing-overlay">
          <div className="logo-large">
            <Logo />
          </div>
          <div className="subtitle">
            California Oak Disease and Arthropod Database
          </div>
        </div>
        <img src="/images/rockville_hills.JPG" alt="" className="landing" />
      </div>
      <div className="card">
        The{' '}
        <b> California Oak Disease and Arthropod host index database (CODA)</b>{' '}
        is a comprehensive compilation of the many agents that affect oaks in
        California. A wide variety of insects, pathogens, and other agents can
        colonize oaks. Only a small number of these can cause serious damage,
        but many can cause noticeable symptoms. CODA is a tool that can be used
        to help identify agents that cause symptoms on oaks in California.
        <br />
        CODA includes information on:
        <ul>
          <li>
            <b>53</b> oak (<i>Quercus</i>) species, varieties, and hybrids,
            including both California natives and introduced species grown in
            cultivation
          </li>
          <li>
            <b>1278</b> agents (arthropods, microorganisms, and abiotic factors)
            that damage, feed on, or colonize oaks
          </li>
          <li>
            <b>2657</b> unique host-agent interactions
          </li>
          <li>
            <b>79</b> symptoms of host-agent interactions including detailed
            descriptions and photos
          </li>
        </ul>
        <p>
          <b>
            <a href="http://phytosphere.com/publications/Fieldguide.htm">
              A field guide to insects and diseases of California oaks
            </a>
          </b>{' '}
          has descriptions and photos of some of the most common and conspicuous
          diseases and arthropods, based on information in CODA and other
          sources.
        </p>
        <br />
        <ul className="home-links">
          <li>
            <a onClick={() => openModal('searchInfo')}>Searching CODA</a>
          </li>
          <li>
            <a onClick={() => openModal('about')}>About CODA</a>
          </li>
          <li>
            <a onClick={() => openModal('citing')}>Citing CODA </a>
          </li>
          <li>
            <a onClick={() => openModal('questions')}>Questions</a>
          </li>
        </ul>
        <SearchingCoda
          show={show.searchInfo}
          handleCloseModal={() => handleCloseModal('searchInfo')}
        />
        <About
          show={show.about}
          handleCloseModal={() => handleCloseModal('about')}
        />
        <Citing
          show={show.citing}
          handleCloseModal={() => handleCloseModal('citing')}
        />
        <Questions
          show={show.questions}
          handleCloseModal={() => handleCloseModal('questions')}
        />
      </div>
    </div>
  );
};

export default Landing;
