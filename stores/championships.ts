import { defineStore } from "pinia";
import {
  Championship,
  ChampionshipGet,
  ChampionshipPut,
} from "~/models/championship.model";
import championshipService from "~/common/championship.service";
import { useDisciplinesStore } from "./disciplines";

export interface FiltersState {
  loading: boolean;
}

export const useChampionshipsStore = defineStore("championships", {
  state: (): FiltersState => ({
    loading: false,
  }),
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    async createChampionship(championship: Championship): Promise<void> {
      this.loading = true;
      await championshipService
        .createChampionship(championship)
        .then(async () => {
          const disciplinesStore = useDisciplinesStore();
          await disciplinesStore.fetchAllDisciplines();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async updateChampionship(championship: ChampionshipPut): Promise<void> {
      this.loading = true;
      await championshipService
        .updateChampionship(championship)
        .then(async () => {
          const disciplinesStore = useDisciplinesStore();
          await disciplinesStore.fetchAllDisciplines().then(async () => {
            await disciplinesStore.setSelectedChampionship(championship.id);
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
