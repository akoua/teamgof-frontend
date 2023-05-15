<template>
  <div class="mb-4">
    <div class="block md:hidden">
      <div class="flex items-center justify-between text-xs">
        <!--Niveau-->
        <div class="dropdown">
          <label tabindex="0" class="btn m-1"
            >Niveau <Icon name="fe:arrow-down"
          /></label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44"
          >
            <li v-for="level in levels" :key="level">
              <a>
                <input
                  type="checkbox"
                  :value="level"
                  v-model="selectedFilters.levels"
                  class="form-checkbox h-4 w-4 text-blue-500"
                />
                <span>{{ level }}</span>
              </a>
            </li>
          </ul>
        </div>
        <!--Location-->
        <div class="dropdown">
          <label tabindex="0" class="btn m-1"
            >Location <Icon name="fe:arrow-down"
          /></label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li v-for="location in locations" :key="location">
              <a>
                <input
                  type="checkbox"
                  :value="location"
                  v-model="selectedFilters.locations"
                  class="form-checkbox h-4 w-4 text-blue-500"
                />
                <span>{{ location }}</span>
              </a>
            </li>
          </ul>
        </div>
        <!--Motivation-->
        <div class="dropdown">
          <label tabindex="0" class="btn m-1"
            >Motivation <Icon name="fe:arrow-down"
          /></label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li v-for="motivation in motivations" :key="motivation">
              <a>
                <input
                  type="checkbox"
                  :value="motivation"
                  v-model="selectedFilters.motivations"
                  class="form-checkbox h-4 w-4 text-blue-500"
                />
                <span>{{ motivation }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="hidden md:block">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFiltersStore } from "~/stores/filters";
import { useTeamsStore } from "~/stores/teams";

export default defineComponent({
  setup() {
    const teamsStore = useTeamsStore();

    const levels = computed(() => {
      const teams = teamsStore.allTeams;
      const levelsSet = new Set<string>();

      teams.forEach((team) => {
        levelsSet.add(team.level);
      });

      return Array.from(levelsSet);
    });

    const locations = computed(() => {
      const teams = teamsStore.allTeams;
      const locationsSet = new Set<string>();

      teams.forEach((team) => {
        locationsSet.add(team.location);
      });

      return Array.from(locationsSet);
    });

    const motivations = computed(() => {
      const teams = teamsStore.allTeams;
      const motivationsSet = new Set<string>();

      teams.forEach((team) => {
        motivationsSet.add(team.motivation);
      });

      return Array.from(motivationsSet);
    });

    return {
      levels,
      locations,
      motivations,
    };
  },
  data() {
    return {
      selectedFilters: {
        levels: [],
        locations: [],
        motivations: [],
      },
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
