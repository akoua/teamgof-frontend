<template>
  <VModal id="teamModal">
    <div v-if="selectedTeam">
      <img :src="selectedTeam.imageUrl" :alt="`${selectedTeam.title}-image`" />
      <div class="mt-4">
        <Icon name="fe:medal" />
        <span class="text-sm ml-1">{{ selectedTeam.level }}</span>
      </div>
      <div class="mt-4">
        <Icon name="fe:location" />
        <span class="text-sm ml-1">{{ selectedTeam.location }}</span>
      </div>
      <div class="mt-4">
        <Icon name="fe:flag" />
        <span class="text-sm ml-1">{{ selectedTeam.motivation }}</span>
      </div>
      <div class="flex justify-between items-center mt-4">
        <h2 class="font-bold text-2xl">
          {{ selectedTeam.title }}
        </h2>
        <span>
          <Icon name="fe:users" /><span class="ml-2 text-sm">{{
            `${selectedTeam.members.length}/5`
          }}</span>
        </span>
      </div>
      <p class="mt-4">{{ selectedTeam.description }}</p>
      <div class="mt-4">
        <h3 class="font-bold underline decoration-4">Membres Actuels</h3>
        <ul class="mt-2">
          <li
            :key="index"
            v-for="(member, index) in selectedTeam.members"
            class="mb-2"
          >
            <span>
              <Icon name="fe:user" />
              {{ `${member.firstName} ${member.lastName}` }}
            </span>
            <span class="ml-8">
              <Icon name="fe:tag" />
              {{ member.ffeNumber }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </VModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTeamsStore } from "~/stores/teams";
import { mapState } from "pinia";
export default defineComponent({
  computed: {
    ...mapState(useTeamsStore, ["selectedTeam"]),
  },
});
</script>

<style scoped></style>
