<template>
  <VModal id="disciplineModal" ref="modalDiscipline">
    <h1 class="text-3xl font-bold text-center mb-5">
      {{
        operation === "create"
          ? "Nouvelle Discipline"
          : `Mis à jour ${selectedDiscipline?.disciplineName}`
      }}
    </h1>
    <form class="max-w-md mx-auto" @submit.prevent="submitForm()">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title"
          >Nom</label
        >
        <input
          v-model="title"
          id="title"
          type="text"
          class="input input-bordered w-full"
          placeholder="Entrez le nom de la discipline"
          required
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-5 mx-auto block"
        :disabled="isLoading"
      >
        {{ operation === "create" ? "Créer" : "Mettre à jour" }}
      </button>
    </form>
  </VModal>
</template>
<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useDisciplinesStore } from "~/stores/disciplines";
import { VModal } from "~/.nuxt/components";
import Discipline from "~/models/discipline.model";
export default defineComponent({
  async setup() {
    const modalDiscipline = ref<InstanceType<typeof VModal>>();

    const closeChildModal = async () => {
      await modalDiscipline.value?.closeModal();
    };

    return {
      modalDiscipline,
      closeChildModal,
    };
  },
  data() {
    return {
      title: "",
    };
  },
  props: {
    operation: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(useDisciplinesStore, ["isLoading", "selectedDiscipline"]),
  },
  methods: {
    ...mapActions(useDisciplinesStore, [
      "createDiscipline",
      "updateDiscipline",
    ]),
    async submitForm() {
      if (!this.title) {
        alert("Veuillez entrer le nom de la discipline.");
        return;
      }
      const discipline = {
        disciplineName: this.title,
      };
      if (this.operation === "create") {
        await this.handleCreateDiscipline(discipline);
      } else {
        await this.handleUpdateDiscipline(discipline);
      }
      this.closeChildModal();
    },
    async handleCreateDiscipline(discipline: Discipline) {
      await this.createDiscipline(discipline);
    },
    async handleUpdateDiscipline(discipline: Discipline) {
      await this.updateDiscipline(discipline);
    },
  },
  watch: {
    operation(value) {
      if (value === "update") {
        this.title = this.selectedDiscipline?.disciplineName!;
      } else {
        this.title = "";
      }
    },
    selectedDiscipline() {
      if (this.operation === "update") {
        this.title = this.selectedDiscipline?.disciplineName!;
      }
    },
  },
});
</script>
