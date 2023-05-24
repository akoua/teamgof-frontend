<template>
  <div class="md:px-20 w-full mt-4">
    <h1 class="font-extrabold uppercase text-3xl">Les équipes</h1>
    <h2 class="mt-1">
      Explorez notre catalogue d'équipes pour trouver celle qui vous convient le
      mieux
    </h2>
    <div class="flex flex-col items-center my-12 w-full">
      <div v-if="loading">
        <p>Chargement...</p>
      </div>
      <template v-else>
        <div
          class="flex flex-col md:flex-row w-full"
          v-if="allTeams.length > 0"
        >
          <div class="w-full md:w-1/6 md:pr-4 mb-4 md:mb-0">
            <TheFilterBar />
          </div>
          <div class="flex flex-col items-center w-full md:w-5/6">
            <div
              class="grid grid-cols-1 md:grid-cols-3 md:gap-3 gap-y-8 place-items-center w-full"
            >
              <VTeamCard :key="team.id" v-for="team in allTeams" :team="team" />
            </div>
          </div>
        </div>
        <template v-else>
          <div class="flex flex-col items-center justify-center p-8">
            <p class="text-gray-500 text-lg text-center mb-4">
              Aucune équipe n'existe actuellement.
            </p>
            <p class="text-gray-500 text-center mb-8">
              Pourquoi ne pas créer votre propre équipe dès maintenant ?
            </p>
            <NuxtLink to="#" class="btn btn-primary">Créer une équipe</NuxtLink>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTeamsStore } from "~/stores/teams";
import { mapState, mapActions } from "pinia";

export default defineComponent({
  setup() {
    useHead({
      title: "Équipes",
    });
  },
  computed: {
    ...mapState(useTeamsStore, ["allTeams", "loading"]),
  },
  methods: {
    ...mapActions(useTeamsStore, ["fetchAllTeams"]),
  },
  created() {
    this.fetchAllTeams();
  },
});
</script>

<style scoped></style>
