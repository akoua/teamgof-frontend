<template>
  <div class="py-20 flex flex-col justify-center items-center">
    <div
      class="grid grid-cols-1 md:grid-cols-2 md:gap-2 gap-y-8 place-items-center w-full"
    >
      <VTeamCard :key="team.id" v-for="team in teams" :team="team" />
    </div>
    <NuxtLink to="/teams">
      <button class="btn btn-primary mt-12">Voir Plus D’équipes</button>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      teams: [
        {
          id: 1,
          title: "Les Galopeurs",
          level: "Débutant",
          imageUrl:
            "https://images.unsplash.com/flagged/photo-1569319388901-605a6d2d1299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
          description:
            "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
          memberCount: 4,
        },
        {
          id: 2,
          title: "Les Galopeurs 2",
          level: "Débutant",
          imageUrl:
            "https://images.unsplash.com/flagged/photo-1569319388901-605a6d2d1299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
          description:
            "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
          memberCount: 2,
        },
      ],
    };
  },
});
</script>

<style scoped></style>
