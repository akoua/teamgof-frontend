<template>
  <div class="md:px-4 w-full mt-4">
    <ThePageTitle
      title="Gestion des Disciplines"
      sub-title="Administrez et gérez les disciplines sportives"
    />
    <label
      for="disciplineModal"
      class="btn btn-primary my-4"
      @click="operation = 'create'"
      >Créer Une Discipline</label
    >
    <p
      class="text-center mt-8"
      v-show="allDisciplines.length === 0 || isLoading"
    >
      Chargement...
    </p>
    <div class="w-full mt-8" v-show="allDisciplines.length > 0 && !isLoading">
      <VTable>
        <template #head>
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </template>
        <template #body>
          <tr
            v-for="discipline in allDisciplines"
            :key="discipline.disciplineId"
          >
            <th>{{ discipline.disciplineId }}</th>
            <td>{{ discipline.disciplineName }}</td>
            <td>
              <label
                for="disciplineModal"
                class="btn btn-success mr-4"
                @click="handleUpdateDiscipline(discipline)"
              >
                <Icon name="fe:pencil" />
              </label>
              <button class="btn btn-error">
                <Icon
                  name="fe:trash"
                  @click="handleDeleteDiscipline(discipline)"
                />
              </button>
            </td>
          </tr>
        </template>
      </VTable>
    </div>
    <ClientOnly>
      <TheDisciplineModal :operation="operation" />
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useDisciplinesStore } from "~/stores/disciplines";
import Discipline from "~/models/discipline.model";
export default defineComponent({
  setup() {
    useHead({
      title: "Disciplines",
    });
  },
  data() {
    return {
      operation: "create",
    };
  },
  computed: {
    ...mapState(useDisciplinesStore, ["allDisciplines", "isLoading"]),
  },
  methods: {
    ...mapActions(useDisciplinesStore, [
      "fetchAllDisciplines",
      "setSelectedDiscipline",
      "deleteDiscipline",
    ]),
    handleUpdateDiscipline(discipline: Discipline): void {
      this.operation = "update";
      this.setSelectedDiscipline(discipline);
    },
    async handleDeleteDiscipline(discipline: Discipline): Promise<void> {
      if (
        confirm(
          `Êtes-vous sûr de vouloir supprimer la discipline ${discipline.disciplineName} ? Cette action est irréversible et entraînera la suppression permanente de tous les championnats associés.`
        )
      ) {
        await this.deleteDiscipline(discipline).then(() => {
          alert("Suppression effectuée.");
        });
      }
    },
  },
  mounted() {
    this.fetchAllDisciplines();
  },
});
</script>
