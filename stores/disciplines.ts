import { defineStore } from "pinia";

import Discipline from "~/models/discipline.model";

export interface DisciplinesState {
  discipline: Discipline | undefined;
  disciplines: Array<Discipline>;
}

export const useDisciplinesStore = defineStore("disciplines", {
  state: (): DisciplinesState => ({
    discipline: undefined,
    disciplines: [
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
    selectedDiscipline: (state) => state.discipline,
    allDisciplines: (state) => state.disciplines,
  },
  actions: {
    setSelectedDiscipline(discipline: Discipline): void {
      this.discipline = discipline;
    },
    async createDiscipline(discipline: Discipline): Promise<void> {
      console.log(discipline);
    },
    async editDiscipline(discipline: Discipline): Promise<void> {
      console.log(discipline);
    },
  },
});
