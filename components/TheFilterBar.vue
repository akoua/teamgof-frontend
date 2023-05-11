<template>
  <div class="mb-4">
    <h3 class="font-bold text-lg mb-2">Niveau</h3>
    <div v-for="level in levels" :key="level" class="mb-2">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          :value="level"
          v-model="selectedFilters.levels"
          class="form-checkbox h-4 w-4 text-blue-500"
        />
        <span>{{ level }}</span>
      </label>
    </div>

    <h3 class="font-bold text-lg mb-2">Location</h3>
    <div v-for="location in locations" :key="location" class="mb-2">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          :value="location"
          v-model="selectedFilters.locations"
          class="form-checkbox h-4 w-4 text-blue-500"
        />
        <span>{{ location }}</span>
      </label>
    </div>

    <h3 class="font-bold text-lg mb-2">Motivation</h3>
    <div v-for="motivation in motivations" :key="motivation" class="mb-2">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          :value="motivation"
          v-model="selectedFilters.motivations"
          class="form-checkbox h-4 w-4 text-blue-500"
        />
        <span>{{ motivation }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFiltersStore } from "~/stores/filters";

export default defineComponent({
  data() {
    return {
      selectedFilters: {
        levels: [],
        locations: [],
        motivations: [],
      },
      levels: ["As Poney Elite"],
      locations: ["Rennes", "Paris", "Nice"],
      motivations: [
        "Convivialité et plaisir",
        "Défis et progression",
        "Esprit d'équipe et compétition",
      ],
    };
  },
  watch: {
    selectedFilters: {
      deep: true,
      handler(newFilters) {
        const filtersStore = useFiltersStore();
        filtersStore.setLevels(newFilters.levels);
        filtersStore.setLocations(newFilters.locations);
        filtersStore.setMotivations(newFilters.motivations);
      },
    },
  },
});
</script>
