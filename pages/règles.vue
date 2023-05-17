<template>
  <div class="md:px-20">
    <TheTitle title="Règles" sub-title="" />
    <button class="btn btn-primary">Ajouter une nouvelle règle</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    useHead({
      title: "Règles",
    });
    return {};
  },
});
</script>

<style scoped></style>
