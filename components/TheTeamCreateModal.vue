<template>
  <VModal id="teamcreate" ref="modal">
    <h1 class="text-3xl font-bold text-center mb-5">Nouvelle Équipe</h1>
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
          placeholder="Entrez le nom de votre équipe"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="description"
          >Description</label
        >
        <textarea
          v-model="description"
          id="description"
          class="textarea textarea-bordered w-full"
          rows="5"
          placeholder="Entrez une description détaillée de votre équipe"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="discipline"
          >Discipline</label
        >
        <select
          v-model="discipline"
          id="discipline"
          class="select select-bordered w-full"
          required
        >
          <option disabled required></option>
          <option :value="discipline" v-for="discipline in allDisciplines">
            {{ discipline.disciplineName }}
          </option>
        </select>
      </div>
      <div class="mb-4" id="results">
        <h2 class="block text-gray-700 text-sm font-bold mb-2">
          Chosissez un niveau
        </h2>
        <select
          v-model="championships"
          id="championships"
          class="select select-bordered w-full"
          multiple
        >
          <option disabled selected></option>
          <option
            v-for="championship in discipline?.championships"
            :value="championship.championshipId"
          >
            {{ championship.championshipName }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="motivation"
          >Motivation</label
        >
        <select
          v-model="motivation"
          id="motivation"
          class="select select-bordered w-full"
          required
        >
          <option selected disabled></option>
          <option value="DECOUVERTE">Decouverte</option>
          <option value="Convivialité et plaisir">
            Convivialité et plaisir
          </option>
          <option value="Défis et progression">Défis et progression</option>
          <option value="Esprit d'équipe et compétition">
            Esprit d'équipe et compétition
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="location"
          >Localisation</label
        >
        <input
          v-model="location"
          id="location"
          type="text"
          class="input input-bordered w-full"
          placeholder="Département"
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
import { useTeamsStore } from "~/stores/teams";
import Discipline from "@/models/discipline.model";
import { VModal } from "~/.nuxt/components";
export default defineComponent({
  async setup() {
    let modal = ref<InstanceType<typeof VModal>>();

    let closeChildModal = async () => {
      await modal.value?.closeModal();
    };
    return {
      modal,
      closeChildModal,
    };
  },
  data() {
    return {
      title: "",
      description: "",
      location: "",
      motivation: "DECOUVERTE",
      discipline: null as Discipline | null,
      championships: [] as Array<number>,
    };
  },
  computed: {
    ...mapState(useDisciplinesStore, ["allDisciplines"]),
    ...mapState(useTeamsStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(useTeamsStore, ["createTeam"]),
    async submitForm() {
      if (
        !this.title ||
        !this.description ||
        !this.location ||
        !this.motivation ||
        !this.discipline ||
        this.championships.length === 0
      ) {
        alert("Veuillez entrer toutes les informations de l'équipe.");
      } else {
        let team = {
          name: this.title,
          description: this.description,
          motivation: this.motivation,
          departement: this.location,
          championshipIds: this.championships,
          members: [],
        };
        await this.createTeam(team).then(async () => {
          await this.closeChildModal();
        });
      }
    },
  },
});
</script>
