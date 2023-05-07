<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img :src="team.imageUrl" :alt="`${team.title}-image`" />
    </figure>
    <div class="card-body">
      <div>
        <Icon name="fe:medal" />
        <span class="text-sm ml-1">{{ team.level }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="card-title">
          {{ team.title }}
        </h2>
        <span>
          <Icon name="fe:users" /><span class="ml-2 text-sm">{{
            `${team.memberCount}/5`
          }}</span>
        </span>
      </div>

      <p>{{ team.description }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-link">Rejoindre l’équipe</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Team {
  title: string;
  level: string;
  imageUrl: string;
  description: string;
  memberCount: number;
}

import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  props: {
    team: {
      type: Object as PropType<Team>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
