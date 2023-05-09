<template>
  <div class="md:px-20 mt-4 w-full mb-12">
    <div
      class="tooltip tooltip-right"
      data-tip="Explorez des équipes recommandées selon votre profil et vos critères pour une expérience de compétition optimale."
    >
      <div class="flex items-center">
        <h1 class="font-bold text-xl md:text-2xl uppercase">
          équipes recommandées
        </h1>
        <Icon name="fe:info" class="ml-2" />
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-y-8 place-items-center w-full mt-8"
    >
      <VTeamCard :key="team.id" v-for="team in teams" :team="team" />
    </div>
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
        {
          id: 3,
          title: "Les Galopeurs 2",
          level: "Intermédiare",
          imageUrl:
            "https://images.unsplash.com/flagged/photo-1569319388901-605a6d2d1299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
          description:
            "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
          memberCount: 2,
        },
        {
          id: 4,
          title: "Les Galopeurs 2",
          level: "Débutant",
          imageUrl:
            "https://images.unsplash.com/flagged/photo-1569319388901-605a6d2d1299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
          description:
            "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
          memberCount: 2,
        },
        {
          id: 5,
          title: "Les Galopeurs 5",
          level: "Expert",
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
