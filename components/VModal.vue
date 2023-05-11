<template>
  <input type="checkbox" :id="id" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label :for="id" class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <slot />
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
    id: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped></style>
