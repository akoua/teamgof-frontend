import { defineStore } from "pinia";

export interface FiltersState {
  levels: string[];
  locations: string[];
  motivations: string[];
}

export const useFilterStore = defineStore("filter", {
  state: (): FiltersState => ({
    levels: [],
    locations: [],
    motivations: [],
  }),
  getters: {
    selectedLevels: (state) => state.levels,
    selectedLocations: (state) => state.locations,
    selectedMotivations: (state) => state.motivations,
  },
  actions: {
    setSelectedLevels(levels: string[]) {
      this.levels = levels;
    },
    setSelectedLocations(locations: string[]) {
      this.locations = locations;
    },
    setSelectedMotivations(motivations: string[]) {
      this.motivations = motivations;
    },
  },
});
