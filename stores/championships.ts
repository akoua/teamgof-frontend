import { defineStore } from "pinia";

import Championship from "~/models/championship.model";
import { DetailType } from "~/models/championship.model";

export interface ChampionshipsState {
  championships: Array<Championship>;
}

export const useChampionshipsStore = defineStore("championships", {
  state: (): ChampionshipsState => ({
    championships: [
      {
        id: 1,
        title: "Club Elite GP Paire",
        riderQualification: 50,
        helpFileUrl: "",
        exclusion: "",
        details: [
          {
            type: DetailType.DisciplinePercentage,
            value: 50,
          },
        ],
        disciplineId: 1,
      },
      {
        id: 2,
        title: "Club Elite",
        riderQualification: 100,
        helpFileUrl: "",
        exclusion: "",
        details: [
          {
            type: DetailType.EventingTypes,
            value: ["CCE Club", "Derby Eventing", "Derby Cross"],
          },
          {
            type: DetailType.DisciplinePercentage,
            value: 50,
          },
        ],
        disciplineId: 2,
      },
    ],
  }),
  getters: {
    allChampionships: (state) => state.championships,
    firstChampionship: (state) => state.championships[1],
  },
  actions: {
    async createChampionship(): Promise<void> {
      //console.log(championship);
    },
    async editDiscipline(championship: Championship): Promise<void> {
      console.log(championship);
    },
  },
});
