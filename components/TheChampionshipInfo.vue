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
                  <p class="font-bold text-lg">Nom de l'épreuve :</p>
                </td>
                <td class="md:w-1/2">
                  <input
                    type="text"
                    class="input input-bordered w-full max-w-xs"
                    v-model="title"
                  />
                </td>
              </tr>
              <tr class="flex flex-col md:flex-row w-full">
                <td class="md:w-1/2">
                  <p class="font-bold text-lg">Exclusions :</p>
                </td>
                <td class="md:w-1/2">
                  <input
                    type="text"
                    class="input input-bordered w-full max-w-xs"
                    v-model="exclusions"
                  />
                </td>
              </tr>
              <tr class="flex flex-col md:flex-row w-full">
                <td class="md:w-1/2">
                  <p class="font-bold text-lg">Qualification Cavalier :</p>
                </td>
                <td class="md:w-1/2">
                  <input
                    type="number"
                    class="input input-bordered w-full max-w-xs"
                    v-model="riderScore"
                  />
                </td>
              </tr>
              <tr class="flex flex-col md:flex-row w-full">
                <td class="md:w-1/2">
                  <p class="font-bold text-lg">Qualification Équidé :</p>
                </td>
                <td class="md:w-1/2">
                  <input
                    type="number"
                    class="input input-bordered w-full max-w-xs"
                    v-model="horseScore"
                  />
                </td>
              </tr>
              <tr class="flex flex-col md:flex-row w-full">
                <td class="md:w-1/2">
                  <p class="font-bold text-lg">Lien fichier aide :</p>
                </td>
                <td class="md:w-1/2">
                  <input
                    type="text"
                    class="input input-bordered w-full max-w-xs"
                    v-model="helpFileUrl"
                  />
                </td>
              </tr>
              <tr class="flex flex-col md:flex-row w-full">
                <td class="md:w-1/2">
                  <p class="font-bold text-lg">Session :</p>
                </td>
                <td class="md:w-1/2">
                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text">Poney</span>
                      <input
                        v-model="session"
                        type="radio"
                        name="radio-10"
                        class="radio checked:bg-primary"
                        value="PONEY"
                      />
                    </label>
                  </div>
                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text">Clubs</span>
                      <input
                        v-model="session"
                        type="radio"
                        name="radio-10"
                        class="radio checked:bg-primary"
                        value="CLUBS"
                      />
                    </label>
                  </div>
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
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import { useDisciplinesStore } from "~/stores/disciplines";
import { ChampionshipGet, ChampionshipPut } from "~/models/championship.model";
import { useChampionshipsStore } from "~/stores/championships";
import { PrecisionItem } from "~/models/precision.model";
export default defineComponent({
  setup() {
    return {};
  },
  computed: {
    ...mapState(useDisciplinesStore, ["selectedChampionship"]),
    ...mapState(useChampionshipsStore, ["isLoading"]),
    displayBtn(): boolean {
      return (
        (this.isValueChanged(this.title, this.selectedChampionship?.title) ||
          this.isValueChanged(
            this.exclusions,
            this.selectedChampionship?.exclusion
          ) ||
          this.isValueChanged(
            this.helpFileUrl,
            this.selectedChampionship?.helpFileUrl
          ) ||
          this.isValueChanged(
            this.riderScore,
            this.selectedChampionship?.qualification.qualificationCavalier
          ) ||
          this.isValueChanged(
            this.horseScore,
            this.selectedChampionship?.qualification.qualificationEquide
          ) ||
          this.isValueChanged(
            this.session,
            this.selectedChampionship?.session
          )) &&
        !this.isLoading
      );
    },
  },
  methods: {
    ...mapActions(useChampionshipsStore, ["updateChampionship"]),
    async onValidate() {
      let mDetails: Array<PrecisionItem> | undefined = undefined;
      if (this.selectedChampionship?.details) {
        mDetails = this.selectedChampionship?.details.map((detail) => {
          const epreuves = detail.values.epreuves.map((epreuve) => {
            return epreuve.championshipId;
          });
          const result: PrecisionItem = {
            precisionType: detail.precisionType,
            values: {
              value: detail.values.value,
              epreuves,
            },
          };
          return result;
        });
      }

      const details = mDetails ? mDetails : undefined;

      const championship: ChampionshipPut = {
        id: this.selectedChampionship?.id!,
        title: this.title,
        exclusion: this.exclusions,
        helpFileUrl: this.helpFileUrl,
        session: this.session,
        disciplineId: this.selectedChampionship?.disciplineId!,
        details,
        qualification: {
          qualificationCavalier: this.riderScore,
          qualificationEquide: this.horseScore,
        },
      };
      await this.updateChampionship(championship);
    },
    isValueChanged(newValue: any, originalValue: any) {
      return newValue !== originalValue && newValue;
    },
  },
  data() {
    return {
      title: "",
      exclusions: "",
      helpFileUrl: "",
      session: "",
      riderScore: 0,
      horseScore: 0,
    };
  },
  watch: {
    selectedChampionship(value) {
      const newChampionship: ChampionshipGet = value;
      this.title = newChampionship.title;
      this.exclusions = newChampionship.exclusion;
      this.helpFileUrl = newChampionship.helpFileUrl;
      this.riderScore = newChampionship.qualification.qualificationCavalier;
      this.horseScore = newChampionship.qualification.qualificationEquide;
      this.session = newChampionship.session;
    },
  },
});
</script>

<style scoped></style>
