<template>
  <VModal id="createDisciplineModal" ref="modalDiscipline">
    <h1 class="text-3xl font-bold text-center mb-5">Nouvelle Discipline</h1>
    <form class="max-w-md mx-auto" @submit.prevent="submitForm">
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
        Créer
      </button>
    </form>
  </VModal>
</template>
<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useDisciplinesStore } from "~/stores/disciplines";
import { VModal } from "~/.nuxt/components";
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
  computed: {
    ...mapState(useDisciplinesStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(useDisciplinesStore, ["createDiscipline"]),
    async submitForm() {
      if (!this.title) {
        alert("Veuillez entrer le nom de la discipline.");
      } else {
        const discipline = {
          disciplineName: this.title,
        };
        await this.createDiscipline(discipline).then(async () => {
          await this.closeChildModal();
        });
      }
    },
  },
});
</script>
