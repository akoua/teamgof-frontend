<template>
  <VCard :fixedWidth="fixedWidth">
    <template v-slot:card-image>
      <div class="w-full h-20 mt-6">
        <img
            src="@/assets/images/no-image.png"
            alt="no-image"
            class="w-full h-full object-contain"
          />
      </div>
    </template>
    <template v-slot:card-body>
      <div>
        <Icon name="fe:medal" />
        <span class="text-xs ml-1">
          Epreuve qualificative : 
          {{
            team.epreuves.map(item => item).join(", ")
          }}
        </span>
      </div>
      <div>
        <Icon name="fe:location" />
        <span class="text-xs ml-1">{{ team.team.departement }}</span>
      </div>
      <div>
        <span class="text-xs ml-1">
          
          {{ team.remainingPoint }} points manquants à obtenir dans les épreuves suivantes : <br />
          {{ team.championships.map(item => item).join(", ") }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="card-title">
          Equipe : {{ team.team.name }}
        </h2>
        <span>
          <Icon name="fe:users" /><span class="ml-2 text-sm">{{
            `${team.team.members?.length}/5`
          }}</span>
        </span>
      </div>
      <p>{{ team.team.description }}</p>
    </template>
    <template v-slot:card-button>
      <label for="teamModal" class="btn btn-link" @click=""
        >Voir Plus</label
      >
    </template>
  </VCard>
</template>

<script lang="ts">
import Team from "~/models/team.model";
import { mapActions } from "pinia";
import { FinalResult, useRecommandationsStore } from "~/stores/recommandations";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    team: {
      type: Object as PropType<FinalResult>,
      required: true,
    },
    fixedWidth: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions(useRecommandationsStore, ["fetchRecommandationsOther"]),
  },
});
</script>

<style scoped></style>
