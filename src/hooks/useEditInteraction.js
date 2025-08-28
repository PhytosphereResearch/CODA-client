import useSWR from 'swr';
import { getInteractionsByOakAndAgent } from '../services/interactions';

export default function useEditInteraction({ oakId, agentId }) {
  const { data, error, isLoading } = useSWR(
    `/api/interactions?oakId=${oakId}&agentId=${agentId}`,
    () =>
      getInteractionsByOakAndAgent({ oakId, agentId }).then((interaction) => {
        interaction.countiesByRegions = interaction.countiesByRegions.map(
          (c) => c.countyCode,
        );
        interaction.hiSymptoms = interaction.hiSymptoms.filter(
          (hiSymptom) => hiSymptom.plantPart,
        );
        interaction.hiSymptoms.forEach((hiSymptom) => {
          hiSymptom.subSite = hiSymptom.subSite.map((s) => ({
            label: s,
            value: s,
          }));
        });
        const formattedPlantParts = countBy(
          interaction.hiSymptoms.map((hiSymptom) => hiSymptom.plantPart),
        );
        const plantParts = PLANT_PARTS.filter(
          (plantPart) => formattedPlantParts[plantPart] !== 2,
        );
        return {
          interaction,
          hiSymptoms: interaction.hiSymptoms,
          plantParts,
        };
      }),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    interaction: data.interaction,
    hiSymptoms: data.hiSymptoms,
    plantParts: data.plantParts,
    error,
    isLoading,
  };
}
