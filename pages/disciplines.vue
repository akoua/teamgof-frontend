<template>
  <div class="relative">
    <div class="px-1 md:px-20 w-full">
      <TheTitle
        title="Disciplines"
        sub-title="Organisez et configurez les disciplines du General Open Rallye de France"
      />
      <div class="my-8">
        <VTable>
          <template v-slot:table-header>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </template>
          <template v-slot:table-body>
            <tr v-for="discipline in allDisciplines" :key="discipline.id">
              <th>{{ discipline.id }}</th>
              <td>{{ discipline.title }}</td>
              <td>
                <label
                  for="disciplineModal"
                  class="btn btn-success mr-12"
                  @click="handleEditDiscipline(discipline)"
                >
                  <Icon name="fe:pencil" />
                </label>
                <button
                  class="btn btn-error"
                  @click="handleDeleteDiscipline(discipline)"
                >
                  <Icon name="fe:trash" />
                </button>
              </td>
            </tr>
          </template>
        </VTable>
      </div>
    </div>
  </div>
  <TheAddDisciplineModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useDisciplinesStore } from "@/stores/disciplines";
import Discipline from "~/models/discipline.model";

export default defineComponent({
  setup() {
    useHead({
      title: "Disciplines",
    });
    return {};
  },
  computed: {
    ...mapState(useDisciplinesStore, ["allDisciplines"]),
  },
  methods: {
    ...mapActions(useDisciplinesStore, ["setSelectedDiscipline"]),
    handleEditDiscipline(discipline: Discipline) {
      this.setSelectedDiscipline(discipline);
    },
    handleAddDiscipline() {
      console.log("hey");
    },
    handleDeleteDiscipline(discipline: Discipline) {
      if (
        confirm(
          `Êtes-vous sûr de vouloir supprimer la discipline ${discipline.title}  ?`
        )
      ) {
        console.log(discipline);
      }
    },
  },
});
</script>

<style scoped></style>
