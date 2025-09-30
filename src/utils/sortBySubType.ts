type RecordWithSubType = {
  hostInteraction: { agent: { subType?: string } };
};

const getSubType = (record: RecordWithSubType) =>
  `${record.hostInteraction.agent.subType} || ''}`;

export default function sortBySubType(
  recordA: RecordWithSubType,
  recordB: RecordWithSubType,
) {
  const nameA = getSubType(recordA);
  const nameB = getSubType(recordB);
  return nameA.localeCompare(nameB);
}
