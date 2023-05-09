<template>
  <VCard>
    <template v-slot:card-image>
      <img :src="team.imageUrl" :alt="`${team.title}-image`" />
    </template>
    <template v-slot:card-body>
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
    </template>
    <template v-slot:card-button>
      <button class="btn btn-link">Rejoindre l’équipe</button>
    </template>
  </VCard>
</template>

<script lang="ts">
import Team from "~/models/team.model";

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
