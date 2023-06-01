import { defineStore } from "pinia";
import Discipline from "~/models/discipline.model";
import disciplineService from "~/common/discipline.service";
import championshipService from "~/common/championship.service";
import { ChampionshipGet } from "~/models/championship.model";

export interface FiltersState {
  disciplines: Array<Discipline>;
  loading: boolean;
  championship: ChampionshipGet | null;
  discipline: Discipline | null;
}

export const useDisciplinesStore = defineStore("disciplines", {
  state: (): FiltersState => ({
    disciplines: [],
    loading: false,
    championship: null,
    discipline: null,
  }),
  getters: {
    allDisciplines: (state) => state.disciplines,
    isLoading: (state) => state.loading,
    selectedDiscipline: (state) => state.discipline,
    selectedChampionship: (state) => state.championship,
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
    async setSelectedChampionship(id: number) {
      this.loading = true;
      await championshipService
        .getChampionship(id)
        .then((championship) => {
          this.championship = championship;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setSelectedDiscipline(discipline: Discipline) {
      this.discipline = discipline;
    },
  },
});
