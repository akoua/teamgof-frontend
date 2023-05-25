import { defineStore } from 'pinia'

export interface FiltersState {
  levels: string[]
  locations: string[]
  motivations: string[]
}

export const useFiltersStore = defineStore('filters', {
  state: (): FiltersState => ({
    levels: [],
    locations: [],
    motivations: [],
  }),
  actions: {
    setLevels(levels: string[]) {
      this.levels = levels
    },
    setLocations(locations: string[]) {
      this.locations = locations
    },
    setMotivations(motivations: string[]) {
      this.motivations = motivations
    },
  },
})
