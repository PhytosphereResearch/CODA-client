export default function sortByLabel(
  recordA: { label: string },
  recordB: { label: string }
) {
  return recordA.label.localeCompare(recordB.label);
}
