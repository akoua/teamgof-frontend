<template>
  <div>
    <div v-show="isLoading">Chargement...</div>
    <div v-show="!isLoading" class="flex flex-col">
      <div class="overflow-x-auto w-full">
        <table class="table w-full">
          <tr class="flex flex-col md:flex-row w-full">
            <td class="md:w-1/2">
              <p class="font-bold text-lg">Pourcentage de la discipline :</p>
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
                v-if="championships.length > 0"
              >
                <li :key="index" v-for="(championship, index) in championships">
                  <a>{{ championship.championshipName }}</a>
                </li>
              </ul>
              <label for="addChampionshipModal" class="btn btn-secondary"
                >Ajouter des épreuves</label
              >
            </td>
          </tr>
        </table>
      </div>
      <button class="btn btn-primary" v-if="displayBtn" @click="onValidate()">
        Valider
      </button>
    </div>
    <TheAddChampionshipModal
      @add-championships="onAddChampionships"
      :existingChampionships="championships"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { usePrecisionsStore } from "~/stores/precisions";
import { DisciplineChampionship } from "~/models/discipline.model";
import Precision from "~/models/precision.model";
import { useDisciplinesStore } from "~/stores/disciplines";
import { ChampionshipGet } from "~/models/championship.model";
export default defineComponent({
  setup() {
    return {};
  },
  computed: {
    ...mapState(usePrecisionsStore, ["isLoading"]),
    ...mapState(useDisciplinesStore, ["selectedChampionship"]),
    displayBtn(): boolean {
      if (this.indicePercentage !== 0 && this.championships.length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(usePrecisionsStore, ["createPrecision"]),
    onAddChampionships(championships: any) {
      this.championships = championships;
    },
    async onValidate() {
      const precision: Precision | null = {
        epreuveIds: [this.selectedChampionship?.id!],
        precisions: [],
      };
      if (this.indicePercentage) {
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
  },
  data() {
    return {
      indicePercentage: 0,
      championships: [] as Array<DisciplineChampionship>,
    };
  },
  watch: {
    selectedChampionship(value) {
      const newChampionship: ChampionshipGet = value;
      newChampionship.details.forEach((precision) => {
        if (precision.precisionType === "DISCIPLINEPERCENTAGE") {
          this.indicePercentage = precision.values.value;
        }
      });
    },
  },
});
</script>

<style scoped></style>
