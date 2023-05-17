<template>
  <div class="md:px-20 w-full mt-4">
    <h1 class="font-extrabold uppercase text-3xl">Les équipes</h1>
    <h2 class="mt-1">
      Explorez notre catalogue d'équipes pour trouver celle qui vous convient le
      mieux
    </h2> 
    <br>
    <label for="teamcreate" class="btn btn-active" @click="handleShowMore"
        >Créer une Equipe</label>
    
    <div class="flex flex-col items-center my-12">
      <div class="flex flex-col md:flex-row">
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
    </div>
    <!-- Ajout de la boîte de dialogue en utilisant un composant -->
    <CreateDialog v-if="showDialog" @closeDialog="showDialog = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTeamsStore } from "~/stores/teams";
import { mapState } from "pinia";

export default defineComponent({
  setup() {
    useHead({
      title: "Équipes",
    });
  },
  computed: {
    ...mapState(useTeamsStore, ["allTeams"]),
  },
  data(){
    return{
      showDialog: false
    }
  },
  methods: {
    handleShowMore() {
      this.showDialog = true;
    }
  }
});
</script>

<style scoped></style>
