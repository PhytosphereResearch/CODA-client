type RecordWithScientificName = {
  genus: string;
  species: string;
  subSpecies?: string;
};

const getScientificName = (record: RecordWithScientificName) =>
  `${record.genus} ${record.species} ${record.subSpecies || ""}`;

export default function sortByScientificName(
  recordA: RecordWithScientificName,
  recordB: RecordWithScientificName,
) {
  const nameA = getScientificName(recordA);
  const nameB = getScientificName(recordB);
  return nameA.localeCompare(nameB);
}
