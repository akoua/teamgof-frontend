<template>
  <VModal id="createChampionshipModal" ref="modalChampionship">
    <h1 class="text-3xl font-bold text-center mb-5">Nouvelle Épreuve</h1>
    <form class="max-w-md mx-auto" @submit.prevent="submitForm">
      <!--Nom-->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title"
          >Nom</label
        >
        <input
          v-model="championship.titles[0]"
          id="title"
          type="text"
          class="input input-bordered w-full"
          placeholder="Entrez le nom de l'épreuve"
          required
        />
      </div>

      <!--Discipline-->
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="discipline"
          >Discipline</label
        >
        <select
          v-model="championship.discipline"
          id="discipline"
          class="select select-bordered w-full"
          required
        >
          <option
            :value="discipline.disciplineName"
            v-for="discipline in allDisciplines"
          >
            {{ discipline.disciplineName }}
          </option>
        </select>
      </div>

      <!--Exclusion-->
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="exclusion"
          >Exclusion</label
        >
        <input
          v-model="championship.exclusion"
          id="exclusion"
          type="text"
          class="input input-bordered w-full"
          placeholder="Entrez l'exclusion de l'épreuve"
        />
      </div>

      <!--Help-->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="help"
          >Fichier d'aide</label
        >
        <input
          v-model="championship.helpFileUrl"
          id="help"
          type="text"
          class="input input-bordered w-full"
          placeholder="Entrez l'url du fichier d'aide"
        />
      </div>

      <!--Session-->
      <div class="mb-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Poney</span>
            <input
              v-model="championship.session"
              type="radio"
              name="radio-10"
              value="PONEY"
              class="radio checked:bg-red-500"
              checked
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Club</span>
            <input
              v-model="championship.session"
              type="radio"
              name="radio-10"
              value="CLUBS"
              class="radio checked:bg-blue-500"
              checked
            />
          </label>
        </div>
      </div>

      <!--Qualification-->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="help"
          >Qualification cavalier</label
        >
        <input
          v-model="championship.qualification.qualificationCavalier"
          id="help"
          type="number"
          min="0"
          class="input input-bordered w-full"
          placeholder="Entrez la session de l'épreuve"
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
import { VModal } from "~/.nuxt/components";

import { useChampionshipsStore } from "~/stores/championships";
import { Session } from "~/models/championship.model";

import { useDisciplinesStore } from "~/stores/disciplines";
export default defineComponent({
  async setup() {
    const modalChampionship = ref<InstanceType<typeof VModal>>();

    const closeChildModal = async () => {
      await modalChampionship.value?.closeModal();
    };

    return {
      modalChampionship,
      closeChildModal,
    };
  },
  data() {
    return {
      championship: {
        titles: [] as Array<string>,
        discipline: "",
        session: Session.CLUBS,
        exclusion: "",
        helpFileUrl: "",
        qualification: {
          qualificationCavalier: 0,
          qualificationEquide: 0,
        },
      },
    };
  },
  computed: {
    ...mapState(useChampionshipsStore, ["isLoading"]),
    ...mapState(useDisciplinesStore, ["allDisciplines"]),
  },
  methods: {
    ...mapActions(useChampionshipsStore, ["createChampionship"]),
    ...mapActions(useDisciplinesStore, ["fetchAllDisciplines"]),

    async submitForm() {
      if (!this.checkObjectPropertiesNotEmpty(this.championship)) {
        alert("Veuillez remplir tous les champs.");
      } else {
        await this.createChampionship(this.championship).then(async () => {
          await this.closeChildModal();
        });
      }
    },
    checkObjectPropertiesNotEmpty(obj: any) {
      for (let prop in obj) {
        if (typeof obj[prop] === "object") {
          // Recursively check nested objects
          if (!this.checkObjectPropertiesNotEmpty(obj[prop])) {
            return false;
          }
        } else if (Array.isArray(obj[prop])) {
          // Check if array is empty
          if (obj[prop].length === 0) {
            return false;
          }
        } else if (
          obj[prop] === "" ||
          obj[prop] === null ||
          obj[prop] === undefined
        ) {
          // Check if string or other primitive type is empty
          return false;
        }
      }

      return true;
    },
  },
  mounted() {
    this.fetchAllDisciplines();
  },
  watch: {
    allDisciplines(oldValue, newValue) {
      if (newValue.length > 0) {
        this.championship.discipline = newValue[0].disciplineName;
      }
    },
  },
});
</script>
