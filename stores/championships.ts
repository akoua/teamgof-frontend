import { defineStore } from "pinia";
import { Championship } from "~/models/championship.model";
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
  },
});
