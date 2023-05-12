<template>
  <div class="py-20 flex flex-col justify-center items-center">
    <div
      class="grid grid-cols-1 md:grid-cols-2 md:gap-2 gap-y-8 place-items-center w-full"
    >
      <VTeamCard
        :key="team.id"
        v-for="team in top2Teams"
        :team="team"
        :fixedWidth="true"
      />
    </div>
    <NuxtLink to="/teams">
      <button class="btn btn-primary mt-12">Voir Plus D’équipes</button>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTeamsStore } from "~/stores/teams";
import { mapState } from "pinia";
import Team from "~/models/team.model";
export default defineComponent({
  setup() {
    return {};
  },
  computed: {
    ...mapState(useTeamsStore, ["teams"]),
    top2Teams(): Array<Team> {
      return this.teams.slice(0, 2);
    },
  },
});
</script>

<style scoped></style>
