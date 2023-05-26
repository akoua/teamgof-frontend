<template>
  <VCard :fixedWidth="fixedWidth">
    <template v-slot:card-image>
      <div class="w-full h-20 mt-6">
        <img
          :src="team.imageUrl"
          :alt="`${team.name}-image`"
          v-if="team.imageUrl"
          class="w-full h-full object-cover"
        />
        <template v-else>
          <img
            src="@/assets/images/no-image.png"
            alt="no-image"
            class="w-full h-full object-contain"
          />
        </template>
      </div>
    </template>
    <template v-slot:card-body>
      <div>
        <Icon name="fe:medal" />
        <span class="text-xs ml-1">
          {{
            team.epreuves
              .map((epreuve) => epreuve.championshipNames.join(" · "))
              .join(" · ")
          }}
        </span>
      </div>
      <div>
        <Icon name="fe:location" />
        <span class="text-xs ml-1">{{ team.departement }}</span>
      </div>
      <div>
        <Icon name="fe:flag" />
        <span class="text-xs ml-1">{{
          $getMotivationValue(team.motivation)
        }}</span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="card-title">
          {{ team.name }}
        </h2>
        <span>
          <Icon name="fe:users" /><span class="ml-2 text-sm">{{
            `${team.members?.length}/5`
          }}</span>
        </span>
      </div>
      <p>{{ team.description }}</p>
    </template>
    <template v-slot:card-button>
      <label for="teamModal" class="btn btn-link" @click="handleShowMore"
        >Voir Plus</label
      >
    </template>
  </VCard>
</template>

<script lang="ts">
import Team from "~/models/team.model";
import { mapActions } from "pinia";
import { useTeamsStore } from "~/stores/teams";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    team: {
      type: Object as PropType<Team>,
      required: true,
    },
    fixedWidth: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions(useTeamsStore, ["setSelectedTeam"]),
    handleShowMore() {
      this.setSelectedTeam(this.team);
    },
  },
});
</script>

<style scoped></style>
