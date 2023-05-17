import { defineStore } from "pinia";

import Sport from "~/models/sport.model";

export interface SportsState {
  sport: Sport | undefined;
  sports: Array<Sport>;
}

export const useSportsStore = defineStore("sports", {
  state: (): SportsState => ({
    sport: undefined,
    sports: [
      {
        id: 1,
        title: "Attelage",
      },
      {
        id: 2,
        title: "CCE",
      },
    ],
  }),
  getters: {
    selectedSport: (state) => state.sport,
    allSports: (state) => state.sports,
  },
  actions: {
    setSelectedSport(sport: Sport): void {
      this.sport = sport;
    },
    async createSport(sport: Sport): Promise<void> {
      console.log(sport);
    },
    async editSport(sport: Sport): Promise<void> {
      console.log(sport);
    },
  },
});
