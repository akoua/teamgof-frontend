<template>
  <div class="md:px-4 w-full mt-4">
    <ThePageTitle
      title="Les équipes"
      sub-title="Explorez notre catalogue d'équipes pour trouver celle qui vous convient le mieux"
    />
    <label
      v-if="filteredTeams.length > 0 && isAuthenticated"
      for="teamcreate"
      class="btn btn-primary my-4"
      >Créer Une Equipe</label
    >
    <div class="flex flex-col items-center mt-8 mb-12 w-full">
      <div v-if="isLoading">
        <p>Chargement...</p>
      </div>
      <template v-else>
        <div
          class="flex flex-col md:flex-row w-full"
          v-if="filteredTeams.length > 0"
        >
          <div class="w-full md:w-1/6 md:pr-4 mb-4 md:mb-0">
            <TheFiltersBar />
          </div>
          <div
            class="flex flex-col items-center w-full md:w-5/6 bg-gray-200 p-6 rounded"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-3 md:gap-3 gap-y-8 place-items-center w-full"
            >
              <VTeamCard
                :key="team.id"
                v-for="team in filteredTeams"
                :team="team"
              />
            </div>
          </div>
        </div>
        <template v-else>
          <div class="flex flex-col items-center justify-center p-8">
            <p class="text-gray-500 text-lg text-center mb-4">
              Aucune équipe n'existe actuellement.
            </p>
            <div class="flex flex-col justify-center items-center">
              <p class="text-gray-500 text-center mb-8">
                Pourquoi ne pas créer votre propre équipe dès maintenant ?
              </p>
              <label
                v-show="isAuthenticated"
                for="teamcreate"
                class="btn btn-primary"
                >Créer une Equipe</label
              >
              <NuxtLink
                v-show="!isAuthenticated"
                to="/sign-up"
                class="btn btn-primary"
                >Créer une Equipe</NuxtLink
              >
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTeamsStore } from "~/stores/teams";
import { useAuthStore } from "@/stores/auth";
import { mapState, mapActions } from "pinia";
import { useDisciplinesStore } from "~/stores/disciplines";
export default defineComponent({
  setup() {
    useHead({
      title: "Équipes",
    });
  },
  computed: {
    ...mapState(useTeamsStore, ["filteredTeams", "isLoading"]),
    ...mapState(useAuthStore, ["isAuthenticated"]),
  },
  methods: {
    ...mapActions(useTeamsStore, ["fetchAllTeams"]),
    ...mapActions(useDisciplinesStore, ["fetchAllDisciplines"]),
  },
  mounted() {
    this.fetchAllTeams();
    if (this.isAuthenticated) {
      this.fetchAllDisciplines();
    }
  },
});
</script>
