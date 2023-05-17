import { defineStore } from "pinia";

export interface FiltersState {
  levels: string[];
  locations: string[];
  motivations: string[];
}

export const useFiltersStore = defineStore("filters", {
  state: (): FiltersState => ({
    levels: [],
    locations: [],
    motivations: [],
  }),
  actions: {
    setLevels(levels: string[]): void {
      this.levels = levels;
    },
    setLocations(locations: string[]): void {
      this.locations = locations;
    },
    setMotivations(motivations: string[]): void {
      this.motivations = motivations;
    },
  },
});
