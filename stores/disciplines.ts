import { defineStore } from "pinia";
import Discipline from "~/models/discipline.model";
import disciplineService from "~/common/discipline.service";

export interface FiltersState {
  disciplines: Array<Discipline>;
  loading: boolean;
  selectedChampionshipId: number | null;
  discipline: Discipline | null;
}

export const useDisciplinesStore = defineStore("disciplines", {
  state: (): FiltersState => ({
    disciplines: [],
    loading: false,
    selectedChampionshipId: null,
    discipline: null,
  }),
  getters: {
    allDisciplines: (state) => state.disciplines,
    isLoading: (state) => state.loading,
    selectedDiscipline: (state) => state.discipline,
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
    async updateDiscipline(discipline: Discipline): Promise<void> {
      this.loading = true;
      const updatedDiscipline: Discipline = {
        disciplineId: this.selectedDiscipline?.disciplineId,
        disciplineName: discipline.disciplineName,
      };
      await disciplineService
        .updateDiscipline(updatedDiscipline)
        .then(async () => {
          await this.fetchAllDisciplines();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async deleteDiscipline(discipline: Discipline): Promise<void> {
      this.loading = true;
      await disciplineService
        .deleteDiscipline(discipline)
        .then(async () => {
          await this.fetchAllDisciplines();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setSelectedChampionship(id: number) {
      this.selectedChampionshipId = id;
    },
    setSelectedDiscipline(discipline: Discipline) {
      this.discipline = discipline;
    },
  },
});
