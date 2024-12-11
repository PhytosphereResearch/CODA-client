const format = (records, idField = "id") =>
  records.map((r) => ({
    value: r[idField],
    label: `${r.genus} ${r.species} ${r.subSpecies||""} ${
      r.commonName ? `(${r.commonName})` : ""
    }`,
    synId: r.id ? r.id : null,
  }));

export default format;
