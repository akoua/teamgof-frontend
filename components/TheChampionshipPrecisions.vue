<template>
  <div>
    <div v-show="isLoading">Chargement...</div>
    <div v-show="!isLoading" class="flex flex-col">
      <ClientOnly>
        <div class="overflow-x-auto w-full">
          <table class="table w-full">
            <tbody>
              <tr class="flex flex-col md:flex-row w-full">
                <td class="md:w-1/2">
                  <p class="font-bold text-lg">
                    Pourcentage de la discipline :
                  </p>
                </td>
                <td class="md:w-1/2">
                  <input
                    type="number"
                    class="input input-bordered w-full max-w-xs"
                    v-model="indicePercentage"
                    placeholder="50"
                  />
                </td>
              </tr>
              <tr class="flex flex-col md:flex-row w-full">
                <td class="md:w-1/2">
                  <p class="font-bold text-lg">Points à obtenir en :</p>
                </td>
                <td class="md:w-1/2">
                  <ul
                    class="menu menu-compact lg:menu-normal bg-base-100 w-56 p-2 rounded-box"
                    v-if="allChampionships.length > 0"
                  >
                    <li
                      :key="index"
                      v-for="(championship, index) in allChampionships"
                    >
                      <a>{{ championship.championshipName }}</a>
                    </li>
                  </ul>
                  <label for="addChampionshipModal" class="btn btn-secondary"
                    >Ajouter des épreuves</label
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="btn btn-primary"
          :disabled="!displayBtn"
          @click="onValidate()"
        >
          Mettre à jour
        </button>
      </ClientOnly>
    </div>
    <TheAddChampionshipModal
      @add-championships="onAddChampionships"
      :existingChampionships="allChampionships"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { usePrecisionsStore } from "~/stores/precisions";
import { DisciplineChampionship } from "~/models/discipline.model";
import Precision, { PrecisionItem } from "~/models/precision.model";
import { useDisciplinesStore } from "~/stores/disciplines";
import { ChampionshipPut } from "~/models/championship.model";
import { useChampionshipsStore } from "~/stores/championships";
export default defineComponent({
  setup() {
    return {};
  },
  computed: {
    ...mapState(usePrecisionsStore, ["isLoading"]),
    ...mapState(useChampionshipsStore, {
      championshipLoading: "isLoading",
    }),
    ...mapState(useDisciplinesStore, ["selectedChampionship"]),
    displayBtn(): boolean {
      return (
        (this.isValueChanged(this.indicePercentage, this.percentage) ||
          !this.isArraysEqual(
            this.allChampionships,
            this.existingChampionships
          )) &&
        !this.isLoading &&
        !this.championshipLoading
      );
    },
    existingChampionships(): Array<DisciplineChampionship> {
      const result: Array<DisciplineChampionship> = [];
      if (this.selectedChampionship?.details) {
        this.selectedChampionship?.details!.forEach((detail) => {
          if (detail.precisionType === "EVENTINGTYPES") {
            detail.values.epreuves.forEach((epreuve) => {
              result.push(epreuve);
            });
          }
        });
      }
      return result;
    },
    allChampionships(): Array<DisciplineChampionship> {
      const result: Array<DisciplineChampionship> = [];
      if (this.selectedChampionship?.details) {
        this.selectedChampionship?.details!.forEach((detail) => {
          if (detail.precisionType === "EVENTINGTYPES") {
            detail.values.epreuves.forEach((epreuve) => {
              result.push(epreuve);
            });
          }
        });
      }

      return [...result, ...this.championships];
    },
    percentage(): number {
      let value: number = 0;
      if (this.selectedChampionship?.details) {
        this.selectedChampionship?.details.forEach((precision) => {
          if (precision.precisionType === "DISCIPLINEPERCENTAGE") {
            value = precision.values.value;
          }
        });
      }
      return value;
    },
  },
  methods: {
    ...mapActions(usePrecisionsStore, ["createPrecision"]),
    ...mapActions(useChampionshipsStore, ["updateChampionship"]),
    isValueChanged(newValue: any, originalValue: any): boolean {
      return newValue !== originalValue && newValue;
    },
    isArraysEqual(first: Array<any>, second: Array<any>) {
      return JSON.stringify(first) == JSON.stringify(second);
    },
    onAddChampionships(championships: any) {
      this.championships = championships;
    },
    async handleCreatePrecision() {
      const precision: Precision | null = {
        epreuveIds: [this.selectedChampionship?.id!],
        precisions: [],
      };
      if (this.indicePercentage !== 0) {
        precision.precisions.push({
          precisionType: "DISCIPLINEPERCENTAGE",
          values: {
            value: this.indicePercentage,
            epreuves: [this.selectedChampionship?.id!],
          },
        });
      }
      if (this.championships.length > 0) {
        const item = {
          precisionType: "EVENTINGTYPES",
          values: {
            value: 100 - this.indicePercentage,
            epreuves: [] as Array<number>,
          },
        };
        this.championships.forEach((currentChampionship) => {
          item.values.epreuves.push(currentChampionship.championshipId);
        });
        precision.precisions.push(item);
      }
      await this.createPrecision(precision!).then(() => {
        alert("Mis à jour effectuée.");
      });
    },
    async update() {
      const details: Array<PrecisionItem> = [];

      details.push({
        precisionType: "DISCIPLINEPERCENTAGE",
        values: {
          value: this.indicePercentage,
          epreuves: [this.selectedChampionship?.id!],
        },
      });
      if (
        !this.isArraysEqual(this.allChampionships, this.existingChampionships)
      ) {
        const epreuves = this.allChampionships.map((championship) => {
          return championship.championshipId;
        });
        details.push({
          precisionType: "EVENTINGTYPES",
          values: {
            value: 100 - this.indicePercentage,
            epreuves,
          },
        });
      } else {
        const mDetail = this.selectedChampionship?.details.find(
          (detail) => detail.precisionType === "EVENTINGTYPES"
        );
        if (mDetail) {
          const epreuves = mDetail.values.epreuves.map((epreuve) => {
            return epreuve.championshipId;
          });
          details.push({
            precisionType: mDetail.precisionType,
            values: {
              value: mDetail.values.value,
              epreuves,
            },
          });
        }
      }
      const championship: ChampionshipPut = {
        ...this.selectedChampionship!,
        details,
      };
      await this.updateChampionship(championship).then(() => {
        alert("Mis à jour effectuée.");
      });
    },
    async onValidate() {
      if (this.selectedChampionship?.details) {
        const details = this.selectedChampionship?.details;
        if (details.length > 0) {
          await this.update().then(() => {
            location.reload();
          });
        } else {
          await this.handleCreatePrecision().then(() => {
            location.reload();
          });
        }
      } else {
        await this.handleCreatePrecision().then(() => {
          location.reload();
        });
      }
    },
  },
  data() {
    return {
      indicePercentage: 0,
      championships: [] as Array<DisciplineChampionship>,
    };
  },
  watch: {
    percentage(value) {
      if (value) {
        this.indicePercentage = value;
      }
    },
  },
});
</script>

<style scoped></style>
