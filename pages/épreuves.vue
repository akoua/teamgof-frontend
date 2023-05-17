<template>
  <div class="px-1 md:px-20">
    <TheTitle
      title="Épreuves"
      sub-title="Planifiez, créez et gérez facilement les épreuves du General Open Rallye de France"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    useHead({
      title: "Épreuves",
    });
    return {};
  },
});
</script>

<style scoped></style>
