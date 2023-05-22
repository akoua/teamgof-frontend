<template>
  <VModal id="disciplineModal">
    <div v-if="selectedDiscipline">
      <h3 class="font-bold text-lg uppercase">
        {{ selectedDiscipline.title }}
      </h3>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Nom de la discipline</span>
        </label>
        <input
          type="text"
          v-model="newTitle"
          :placeholder="selectedDiscipline.title"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="mt-4">
        <button class="btn btn-success" @click="handleEditDiscipline()">
          Mettre à jour la discipline
        </button>
      </div>
    </div>
  </VModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useDisciplinesStore } from "@/stores/disciplines";
import Discipline from "~/models/discipline.model";
export default defineComponent({
  data() {
    return {
      newTitle: "",
    };
  },
  computed: {
    ...mapState(useDisciplinesStore, ["selectedDiscipline"]),
  },
  methods: {
    ...mapActions(useDisciplinesStore, ["editDiscipline"]),
    async handleEditDiscipline() {
      if (!this.newTitle) {
        alert(
          "Le nom de la discipline ne peut pas être vide lors de la mise à jour. Veuillez spécifier un nom valide pour la discipline."
        );
      } else {
        const updatedDiscipline: Discipline = {
          ...this.selectedDiscipline,
          title: this.newTitle,
        };
        await this.editDiscipline(updatedDiscipline).finally(() => {
          this.newTitle = "";
        });
      }
    },
  },
});
</script>

<style scoped></style>
