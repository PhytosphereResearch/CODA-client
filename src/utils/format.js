const format = (records, idField = "id") =>
  records.map((r) => ({
    value: r[idField],
    label: `${r.genus} ${r.species} ${r.subSpecies||""} ${
      r.commonName ? `(${r.commonName})` : ""
    }`,
    synId: r.id ? r.id : null,
  })).sort((recordA, recordB) => recordA.label.localeCompare(recordB.label));

export default format;
