<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="flex h-screen items-center justify-center bg-base-300 text-white">
    <slot />
  </div>
</template>
