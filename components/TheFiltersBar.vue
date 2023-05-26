<template>
  <div class="text-sm space-y-3">
    <div v-if="allLevels.length">
      <h2>Niveau</h2>
      <ul>
        <li v-for="level in allLevels" :key="level">
          <label v-if="!isLevelDisabled(level)">
            <input
              type="checkbox"
              :value="level"
              v-model="selectedFilters.levels"
              @change="updateFilters"
            />
            {{ level }}
          </label>
        </li>
      </ul>
    </div>

    <div v-if="allLocations.length">
      <h2>Localisation</h2>
      <ul>
        <li v-for="location in allLocations" :key="location">
          <label v-if="!isLocationDisabled(location)">
            <input
              type="checkbox"
              :value="location"
              v-model="selectedFilters.locations"
              @change="updateFilters"
            />
            {{ location }}
          </label>
        </li>
      </ul>
    </div>

    <div v-if="allMotivations.length">
      <h2>Motivation</h2>
      <ul>
        <li v-for="motivation in allMotivations" :key="motivation">
          <label v-if="!isMotivationDisabled(motivation)">
            <input
              type="checkbox"
              :value="motivation"
              v-model="selectedFilters.motivations"
              @change="updateFilters"
            />
            {{ $getMotivationValue(motivation) }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useTeamsStore } from "@/stores/teams";
import { useFilterStore } from "@/stores/filter";

export default defineComponent({
  name: "Filters",
  setup() {
    const teamStore = useTeamsStore();
    const filterStore = useFilterStore();

    const allLevels = computed(() => teamStore.allLevels);
    const allLocations = computed(() => teamStore.allLocations);
    const allMotivations = computed(() => teamStore.allMotivations);
    const selectedFilters = computed(() => ({
      levels: filterStore.selectedLevels,
      locations: filterStore.selectedLocations,
      motivations: filterStore.selectedMotivations,
    }));

    const updateFilters = () => {
      filterStore.setSelectedLevels(selectedFilters.value.levels);
      filterStore.setSelectedLocations(selectedFilters.value.locations);
      filterStore.setSelectedMotivations(selectedFilters.value.motivations);
    };

    const isLevelDisabled = (level: string) => {
      const selectedMotivations = filterStore.selectedMotivations;
      const selectedLocations = filterStore.selectedLocations;
      const filteredTeams = teamStore.filteredTeams;
      const isMotivationSelected = selectedMotivations.length > 0;
      const isLocationSelected = selectedLocations.length > 0;

      if (isMotivationSelected || isLocationSelected) {
        // Check if there are any teams matching the selected motivations and locations
        const teamsMatchingMotivationsAndLocations = filteredTeams.filter(
          (team) =>
            (selectedMotivations.length === 0 ||
              selectedMotivations.includes(team.motivation)) &&
            (selectedLocations.length === 0 ||
              selectedLocations.includes(team.departement))
        );

        // Check if the current level is present in any of the teams matching motivations and locations
        const isLevelMatched = teamsMatchingMotivationsAndLocations.some(
          (team) =>
            team.epreuves.some((epreuve) =>
              epreuve.championshipNames.includes(level)
            )
        );

        return !isLevelMatched;
      }

      return false;
    };

    const isLocationDisabled = (location: string) => {
      const selectedMotivations = filterStore.selectedMotivations;
      const selectedLevels = filterStore.selectedLevels;
      const filteredTeams = teamStore.filteredTeams;
      const isMotivationSelected = selectedMotivations.length > 0;
      const isLevelSelected = selectedLevels.length > 0;

      if (isMotivationSelected || isLevelSelected) {
        // Check if there are any teams matching the selected motivations and levels
        const teamsMatchingMotivationsAndLevels = filteredTeams.filter(
          (team) =>
            (selectedMotivations.length === 0 ||
              selectedMotivations.includes(team.motivation)) &&
            (selectedLevels.length === 0 ||
              selectedLevels.some((level) =>
                team.epreuves.some((epreuve) =>
                  epreuve.championshipNames.includes(level)
                )
              ))
        );

        // Check if the current location is present in any of the teams matching motivations and levels
        const isLocationMatched = teamsMatchingMotivationsAndLevels.some(
          (team) => team.departement === location
        );

        return !isLocationMatched;
      }

      return false;
    };

    const isMotivationDisabled = (motivation: string) => {
      const selectedLevels = filterStore.selectedLevels;
      const selectedLocations = filterStore.selectedLocations;
      const filteredTeams = teamStore.filteredTeams;
      const isLevelSelected = selectedLevels.length > 0;
      const isLocationSelected = selectedLocations.length > 0;

      if (isLevelSelected || isLocationSelected) {
        // Check if there are any teams matching the selected levels and locations
        const teamsMatchingLevelsAndLocations = filteredTeams.filter(
          (team) =>
            (selectedLevels.length === 0 ||
              selectedLevels.some((level) =>
                team.epreuves.some((epreuve) =>
                  epreuve.championshipNames.includes(level)
                )
              )) &&
            (selectedLocations.length === 0 ||
              selectedLocations.includes(team.departement))
        );
        // Check if the current motivation is present in any of the teams matching levels and locations
        const isMotivationMatched = teamsMatchingLevelsAndLocations.some(
          (team) => team.motivation === motivation
        );

        return !isMotivationMatched;
      }
      return false;
    };

    return {
      allLevels,
      allLocations,
      allMotivations,
      selectedFilters,
      updateFilters,
      isLevelDisabled,
      isLocationDisabled,
      isMotivationDisabled,
    };
  },
});
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
