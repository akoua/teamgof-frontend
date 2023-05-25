<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <input :id="id" type="checkbox" class="modal-toggle">
  <div class="modal">
    <div class="modal-box relative">
      <label :for="id" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
