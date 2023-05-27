import { defineStore } from "pinia";
import Discipline from "~/models/discipline.model";
import disciplineService from "~/common/discipline.service";

export interface FiltersState {
  disciplines: Array<Discipline>;
  loading: boolean;
  selectedChampionshipId: number | null;
}

export const useDisciplinesStore = defineStore("disciplines", {
  state: (): FiltersState => ({
    disciplines: [],
    loading: false,
    selectedChampionshipId: null,
  }),
  getters: {
    allDisciplines: (state) => state.disciplines,
    isLoading: (state) => state.loading,
    selectedChampionship: (state) => {
      for (const discipline of state.disciplines) {
        const championship = discipline.championships?.find(
          (c) => c.championshipId === state.selectedChampionshipId!
        );
        if (championship) {
          return championship;
        }
      }
      return null;
    },
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
    setSelectedChampionship(id: number) {
      this.selectedChampionshipId = id;
    },
  },
});
