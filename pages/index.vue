<template>
  <TheHeroSection />
  <TheTeamShowcaseSection />
  <TheAboutSection />
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { useTeamsStore } from "~/stores/teams";
export default defineComponent({
  setup() {
    useHead({
      title: "Accueil",
    });
  },
  methods: {
    ...mapActions(useTeamsStore, ["fetchAllTeams"]),
  },
  mounted() {
    this.fetchAllTeams();
  },
});
</script>

<style scoped></style>
