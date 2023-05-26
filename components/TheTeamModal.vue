<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useTeamsStore } from '~/stores/teams'

export default defineComponent({
  computed: {
    ...mapState(useTeamsStore, ['selectedTeam']),
  },
})
</script>

<template>
  <VModal id="teamModal">
    <div v-if="selectedTeam">
      <div class="w-full h-20">
        <img
          v-if="selectedTeam.imageUrl"
          :src="selectedTeam.imageUrl"
          :alt="`${selectedTeam.name}-image`"
          class="w-full h-full object-cover"
        >
        <template v-else>
          <img
            src="@/assets/images/no-image.png"
            alt="no-image"
            class="w-full h-full object-contain"
          >
        </template>
      </div>

      <div class="mt-4">
        <Icon name="fe:medal" />
        <span class="text-xs ml-1">
          {{
            selectedTeam.epreuves
              .map((epreuve) => epreuve.championshipNames.join(" · "))
              .join(" · ")
          }}
        </span>
      </div>
      <div class="mt-4">
        <Icon name="fe:location" />
        <span class="text-sm ml-1">{{ selectedTeam.departement }}</span>
      </div>
      <div class="mt-4">
        <Icon name="fe:flag" />
        <span class="text-sm ml-1">{{
          $getMotivationValue(selectedTeam.motivation)
        }}</span>
      </div>
      <div class="flex justify-between items-center mt-4">
        <h2 class="font-bold text-2xl">
          {{ selectedTeam.name }}
        </h2>
        <span>
          <Icon name="fe:users" /><span class="ml-2 text-sm">{{
            `${selectedTeam.members?.length}/5`
          }}</span>
        </span>
      </div>
      <p class="mt-4">
        {{ selectedTeam.description }}
      </p>
      <div class="mt-4">
<<<<<<< HEAD
        <h3 class="font-bold underline decoration-4">
          Membres Actuels
        </h3>
        <ul class="mt-2">
=======
        <h3 class="font-bold underline decoration-4">Membres Actuels</h3>
        <ul class="mt-2" v-if="selectedTeam.members?.length! > 0">
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
          <li
            v-for="(member, index) in selectedTeam.members"
            :key="index"
            class="mb-2"
          >
            <span>
              <Icon name="fe:user" />
              {{ `${member.firstName} ${member.lastName}` }}
            </span>
            <span class="ml-8">
              <Icon name="fe:tag" />
              {{ member.ffe }}
            </span>
          </li>
        </ul>
        <template v-else>
          <p class="mt-2">Pas encore de membres</p>
        </template>
      </div>
    </div>
  </VModal>
</template>

<style scoped></style>
