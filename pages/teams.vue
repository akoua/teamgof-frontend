<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useTeamsStore } from '~/stores/teams'

export default defineComponent({
  setup() {
    useHead({
      title: 'Équipes',
    })
  },
  computed: {
    ...mapState(useTeamsStore, ['allTeams', 'loading']),
  },
  methods: {
    ...mapActions(useTeamsStore, ['fetchAllTeams']),
  },
  created() {
    this.fetchAllTeams()
  },
})
</script>

<template>
<<<<<<< HEAD
  <div class="md:px-20 w-full mt-4">
    <h1 class="font-extrabold uppercase text-3xl">
      Les équipes
    </h1>
=======
  <div class="md:px-4 w-full mt-4">
    <h1 class="font-extrabold uppercase text-3xl">Les équipes</h1>
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
    <h2 class="mt-1">
      Explorez notre catalogue d'équipes pour trouver celle qui vous convient le
      mieux
    </h2>
    <label
      v-if="filteredTeams.length > 0 && isAuthenticated"
      for="teamcreate"
      class="btn btn-primary my-4"
      >Créer une Equipe</label
    >
    <div class="flex flex-col items-center mt-2 mb-12 w-full">
      <div v-if="isLoading">
        <p>Chargement...</p>
      </div>
      <template v-else>
        <div
<<<<<<< HEAD
          v-if="allTeams.length > 0"
          class="flex flex-col md:flex-row w-full"
=======
          class="flex flex-col md:flex-row w-full"
          v-if="filteredTeams.length > 0"
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
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
<<<<<<< HEAD
              <VTeamCard v-for="team in allTeams" :key="team.id" :team="team" />
=======
              <VTeamCard
                :key="team.id"
                v-for="team in filteredTeams"
                :team="team"
              />
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
            </div>
          </div>
        </div>
        <template v-else>
          <div class="flex flex-col items-center justify-center p-8">
            <p class="text-gray-500 text-lg text-center mb-4">
              Aucune équipe n'existe actuellement.
            </p>
<<<<<<< HEAD
            <p class="text-gray-500 text-center mb-8">
              Pourquoi ne pas créer votre propre équipe dès maintenant ?
            </p>
            <NuxtLink to="#" class="btn btn-primary">
              Créer une équipe
            </NuxtLink>
=======
            <div class="flex flex-col justify-center items-center">
              <p class="text-gray-500 text-center mb-8">
                Pourquoi ne pas créer votre propre équipe dès maintenant ?
              </p>
              <label
                v-if="isAuthenticated"
                for="teamcreate"
                class="btn btn-primary"
                >Créer une Equipe</label
              >
              <template v-else>
                <NuxtLink to="/sign-up" class="btn btn-primary"
                  >Créer une Equipe</NuxtLink
                >
              </template>
            </div>
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<<<<<<< HEAD
=======
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

>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
<style scoped></style>
