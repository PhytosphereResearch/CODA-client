import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router";
import { getInteractions } from "../../services/interactions";
import SearchResult from "./SearchResult";
import SymptomPreview from "./SymptomPreview";
import { Spinner } from "../shared/shapes";
import { PLANT_PARTS } from "../edit/constants";

const plantParts = PLANT_PARTS;

const Interactions = (props) => {
  const [selected, setSelected] = useState({});
  const [interactions, setInteractions] = useState([]);
  const [searching, setSearching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const onSearch = () => {
    if (location.search) {
      goSearch(location.search);
    }
  };

  useEffect(() => {
    onSearch();
  }, [location.search]);

  const onSearchClick = () => {
    const symptom = selected.symptom
      ? `${selected.symptom.value}@${selected.symptom.label}`
      : "";
    const oak = selected.oak
      ? `${selected.oak.value}@${selected.oak.label}`
      : "";
    const options = { symptom, oak, plantPart: selected.plantPart };
    const query = Object.keys(options)
      .map((key) => `${key}=${options[key]}`)
      .join("&");

    navigate(`/hi?${query}`, { replace: true });
  };

  const onSelect = (option, key) => {
    const updatedSelected = { ...selected };
    if (key === "plantPart" && selected.symptom && !selected.symptom[option]) {
      updatedSelected.symptom = undefined;
    }
    updatedSelected[key] = option;
    setSelected(updatedSelected);
  };

  const canSearch = () => {
    const { symptom, oak } = selected;
    return (symptom && symptom.value) || (oak && oak.value);
  };

  const goSearch = (query) => {
    if (!query) {
      return;
    }
    const search = {};
    query
      .replace("?", "")
      .split("&")
      .map((pair) => pair.split("="))
      .forEach((pair) => {
        search[pair[0]] = pair[1].split("@");
      });
    const oak = search.oak[0]
      ? { value: search.oak[0], label: decodeURI(search.oak[1]) }
      : undefined;
    const symptom = search.symptom[0]
      ? { value: search.symptom[0], label: decodeURI(search.symptom[1]) }
      : undefined;
    const updatedSelected = {
      ...selected,
      plantPart: search.plantPart[0],
      oak,
      symptom,
    };
    setSearching(true);
    setSelected(updatedSelected);
    setInteractions([]);

    getInteractions(search.plantPart[0], search.symptom[0], search.oak[0]).then(
      (interactions) => {
        setInteractions(interactions);
        setSearching(false);
      }
    );
  };

  const { oaks, symptoms } = props;
  return (
    <div>
      <h2>Find an agent by symptoms</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ width: "50%" }}>
          <h4 style={{ marginBottom: "0" }}>Select your oak</h4>
          <div style={{ paddingBottom: "20px" }}>
            <small> or leave blank to search all oaks</small>
          </div>
          <Select
            options={oaks}
            onChange={(option) => {
              setInteractions([]);
              location.search = null;
              onSelect(option, "oak");
            }}
            value={selected.oak}
            placeholder="Search oaks by species or common name"
            style={{ marginBottom: "15px" }}
          />
          <h4>Symptom location</h4>
          <div style={{ marginBottom: "15px", display: "flex" }}>
            {plantParts.map((part) => (
              <button
                style={{ flexGrow: "1" }}
                className={selected.plantPart === part ? "inSearch" : ""}
                onClick={() => {
                  setInteractions([]);
                  location.search = null;
                  onSelect(part, "plantPart");
                }}
                key={part}
              >
                {part}
              </button>
            ))}
          </div>
          <h4>Symptom</h4>
          <Select
            disabled={!selected.plantPart}
            options={symptoms.filter((symptom) => symptom[selected.plantPart])}
            onChange={(option) => {
              setInteractions([]);
              location.search = null;
              onSelect(option, "symptom");
            }}
            value={selected.symptom}
            placeholder="Select a symptom"
            style={{ marginBottom: "15px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: "1",
          }}
        >
          <SymptomPreview
            plantPart={selected.plantPart}
            symptom={selected.symptom}
          />
        </div>
      </div>
      <div className="go-search">
        <button
          disabled={!canSearch()}
          className="search-button"
          onClick={onSearchClick}
        >
          Search this combination
        </button>
      </div>
      <div className="interactionsList">
        {searching ? <Spinner /> : null}
        {!searching && !interactions.length && location.search ? (
          <div style={{ textAlign: "center" }}>
            <h3>No Results Found</h3>
            <h4>Try modifying your search</h4>
          </div>
        ) : null}
        <ul>
          {interactions.map((interaction) => (
            <SearchResult key={interaction.id} interaction={interaction} />
          ))}
        </ul>
      </div>
    </div>
  );
};

Interactions.propTypes = {
  oaks: PropTypes.array,
  symptoms: PropTypes.array,
  location: PropTypes.object,
};

export default Interactions;
