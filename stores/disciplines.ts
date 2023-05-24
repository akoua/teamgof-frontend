import { defineStore } from "pinia";
import Discipline from "~/models/discipline.model";
import disciplineService from "~/common/discipline.service";

export interface FiltersState {
  disciplines: Array<Discipline>;
}

export const useDisciplinesStore = defineStore("disciplines", {
  state: (): FiltersState => ({
    disciplines: [],
  }),
  getters: {
    allDisciplines: (state) => state.disciplines,
  },
  actions: {
    async fetchAllDisciplines(): Promise<void> {
      await disciplineService.getAllDisciplines().then((disciplines) => {
        this.disciplines = disciplines;
      });
    },
  },
});
