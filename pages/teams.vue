<template>
  <div class="md:px-20 w-full mt-4 border-yellow-400 border-2">
    <h1 class="font-extrabold uppercase text-3xl">Les équipes</h1>
    <h2 class="mt-1">
      Explorez notre catalogue d'équipes pour trouver celle qui vous convient le
      mieux
    </h2>
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
      <!--<VPagination />-->
    </div>
  </div>
</template>

<script lang="ts">
useHead({
  title: "Équipes - TEAMGOF",
});
import { defineComponent } from "vue";
import { useTeamsStore } from "~/stores/teams";
import { mapState } from "pinia";

export default defineComponent({
  computed: {
    ...mapState(useTeamsStore, ["allTeams"]),
  },
});
</script>

<style scoped></style>
