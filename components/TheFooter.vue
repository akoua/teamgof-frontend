<template>
  <footer
    class="footer footer-center px-4 py-12 bg-secondary text-[#F5F5F5] md:px-20"
  >
    <div>
      <p>Tous droits réservés © TEAMGOF | {{ `2023-${year}` }}</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
});
</script>

<style scoped></style>
