<template>
  <div class="px-1 md:px-20">
    <TheTitle
      title="Championnats"
      sub-title="Planifiez, créez et gérez facilement les championnat du General Open Rallye de France"
    />
    <div class="my-8">
      <label for="addModal" class="btn btn-primary"
        ><Icon name="fe:plus" size="24" class="mr-2" /> Ajouter un nouveau
        championnat</label
      >
      <div class="mt-8">
        <VTable>
          <template v-slot:table-header>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Discipline</th>
              <th>Actions</th>
            </tr>
          </template>
          <template v-slot:table-body>
            <slot />
            <tr v-for="championship in allChampionships" :key="championship.id">
              <th>{{ championship.id }}</th>
              <td>{{ championship.title }}</td>
              <td>{{ championship.disciplineId }}</td>
              <td>
                <label
                  for="championshipModal"
                  class="btn mr-12 bg-blue-600 border-none"
                >
                  <NuxtLink to="/">
                    <Icon name="fe:eye" />
                  </NuxtLink>
                </label>
                <button
                  class="btn btn-error"
                  @click="handleDeleteChampionship(championship)"
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
  <button @click="createChampionship()"></button>
  {{ firstChampionship }}
  <TheAddChampionshipModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useChampionshipsStore } from "@/stores/championships";
import { mapState, mapActions } from "pinia";
import Championship from "~/models/championship.model";

export default defineComponent({
  setup() {
    useHead({
      title: "Championnat",
    });
    return {};
  },
  computed: {
    ...mapState(useChampionshipsStore, [
      "allChampionships",
      "firstChampionship",
    ]),
  },
  methods: {
    ...mapActions(useChampionshipsStore, ["createChampionship"]),
    handleDeleteChampionship(championship: Championship) {
      if (
        confirm(
          `Êtes-vous sûr de vouloir supprimer le championnat ${championship.title}  ?`
        )
      ) {
        console.log(championship);
      }
    },
  },
  created() {
    this.createChampionship();
  },
});
</script>

<style scoped></style>
