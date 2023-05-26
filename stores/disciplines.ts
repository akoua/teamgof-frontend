import { defineStore } from "pinia";
import Discipline from "~/models/discipline.model";
import disciplineService from "~/common/discipline.service";

export interface FiltersState {
  disciplines: Array<Discipline>;
  loading: boolean;
}

export const useDisciplinesStore = defineStore("disciplines", {
  state: (): FiltersState => ({
    disciplines: [],
    loading: false,
  }),
  getters: {
    allDisciplines: (state) => state.disciplines,
    isLoading: (state) => state.loading,
  },
  actions: {
    async fetchAllDisciplines(): Promise<void> {
      await disciplineService.getAllDisciplines().then((disciplines) => {
        this.disciplines = disciplines;
      });
    },
    async createDiscipline(discipline: Discipline): Promise<void> {
      this.loading = true;
      await disciplineService
        .createDiscipline(discipline)
        .then((newDiscipline) => {
          this.disciplines.push(newDiscipline!);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
