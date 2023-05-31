import { defineStore } from "pinia";

import Precision from "~/models/precision.model";
import precisionService from "~/common/precision.service";
import { useDisciplinesStore } from "./disciplines";

export interface FiltersState {
  loading: boolean;
}

export const usePrecisionsStore = defineStore("precisions", {
  state: (): FiltersState => ({
    loading: false,
  }),
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    async createPrecision(precision: Precision): Promise<void> {
      this.loading = true;
      await precisionService
        .createPrecision(precision)
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
