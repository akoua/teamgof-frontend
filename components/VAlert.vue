<template>
  <div class="alert alert-success shadow-lg">
    <div>
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped></style>
