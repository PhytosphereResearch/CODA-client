type RecordWithAgent = {
  torder?: string;
  hostInteraction: object;
  agent: object;
  subtype: string;
};
const getSubType = (record: RecordWithSubType) =>
  `${record.hostInteraction.agent.subType} || ''}`;

const getTorder = (record: RecordWithTorderAndSubtype) =>
  `${record.hostInteraction.agent.torder} || ''}`;

export default function sortByTorderAndSubtype(
  recordA: RecordWithTorderAndSubtype,
  recordB: RecordWithTorderAndSubtype,
) {
  const nameA = getTorder(recordA);
  const nameB = getTorder(recordB);
  return nameA.localeCompare(nameB);
}
