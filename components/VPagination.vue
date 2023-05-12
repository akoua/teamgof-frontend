<template>
  <div class="btn-group py-12">
    <button
      class="btn"
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      «
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      class="btn"
      :class="{ 'btn-active': currentPage === page }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button
      class="btn"
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      »
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useTeamsStore } from "@/stores/teams"; // Import your teams store

export default defineComponent({
  setup() {
    const teamsStore = useTeamsStore();

    // Calculate the total number of pages based on the number of teams and items per page
    const totalPages = computed(() => {
      const teamsCount = teamsStore.allTeams.length; // Use the filtered teams from your store
      const itemsPerPage = 2; // Set the number of items per page
      return Math.ceil(teamsCount / itemsPerPage);
    });

    // Track the current page
    const currentPage = ref(1);

    // Method to navigate to a specific page
    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    return {
      totalPages,
      currentPage,
      goToPage,
    };
  },
});
</script>

<style scoped></style>
