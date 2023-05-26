<template>
  <div class="md:px-4 w-full mt-4">
    <ThePageTitle
      title="Gestion des Disciplines"
      sub-title="Administrez et gérez les disciplines sportives"
    />
    <label for="createDisciplineModal" class="btn btn-primary my-4"
      >Créer Une Discipline</label
    >
    <p class="text-center mt-8" v-show="allDisciplines.length === 0">
      Chargement...
    </p>
    <div class="w-full mt-8" v-show="allDisciplines.length > 0">
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
              <button class="btn btn-success mr-4">
                <Icon name="fe:pencil" />
              </button>
              <button class="btn btn-error">
                <Icon name="fe:trash" />
              </button>
            </td>
          </tr>
        </template>
      </VTable>
    </div>
    <ClientOnly>
      <TheDisciplineCreateModal />
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useDisciplinesStore } from "~/stores/disciplines";
export default defineComponent({
  computed: {
    ...mapState(useDisciplinesStore, ["allDisciplines"]),
  },
  methods: {
    ...mapActions(useDisciplinesStore, ["fetchAllDisciplines"]),
  },
  mounted() {
    this.fetchAllDisciplines();
  },
});
</script>
