<template>
  <div>
    <VModal id="addChampionshipModal" ref="modal">
      <h1 class="text-3xl font-bold text-center mb-5">Ajout épreuves</h1>
      <div class="mb-4" id="results">
        <h2 class="block text-gray-700 text-sm font-bold mb-2">
          Sélectionnez les épreuves
        </h2>
        <select
          v-model="championships"
          id="championships"
          class="select select-bordered w-full"
          multiple
        >
          <option
            v-for="championship in allChampionships"
            :value="championship"
          >
            {{ championship.championshipName }}
          </option>
        </select>
      </div>
      <button class="btn btn-primary" @click="handleAddChampionships()">
        Ajouter les épreuves
      </button>
    </VModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { VModal } from "~/.nuxt/components";
import { useDisciplinesStore } from "~/stores/disciplines";
import { DisciplineChampionship } from "~/models/discipline.model";
export default defineComponent({
  setup() {
    const modal = ref<InstanceType<typeof VModal>>();

    const closeChildModal = async () => {
      await modal.value?.closeModal();
    };
    const { $getPrecisionKey } = useNuxtApp();

    return {
      modal,
      closeChildModal,
      getPrecisionKey: $getPrecisionKey,
    };
  },
  emits: ["addChampionships"],
  methods: {
    ...mapActions(useDisciplinesStore, ["fetchAllDisciplines"]),
    async handleAddChampionships() {
      if (this.championships.length > 0) {
        this.$emit("addChampionships", [...this.championships]);
        this.closeChildModal();
      } else {
        alert("Veuillez sélectionner au moins une épreuve.");
      }
    },
  },
  data() {
    return {
      championships: [] as Array<DisciplineChampionship>,
    };
  },
  computed: {
    ...mapState(useDisciplinesStore, ["allDisciplines"]),
    allChampionships(): Array<DisciplineChampionship> {
      const result: Array<DisciplineChampionship> = [];
      this.allDisciplines.forEach((discipline) => {
        discipline.championships?.forEach((championship) => {
          if (
            !this.existingChampionships.some(
              (current) =>
                current.championshipName === championship.championshipName
            )
          ) {
            result.push(championship);
          }
        });
      });
      return result;
    },
  },
  props: {
    existingChampionships: {
      type: Array<DisciplineChampionship>,
      required: true,
    },
  },
  mounted() {
    this.fetchAllDisciplines();
  },
});
</script>

<style scoped></style>
