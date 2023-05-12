<template>
    <div class="flex h-screen items-center justify-center bg-base-300 text-white">
    <div class="flex items-center justify-center bg-base-300">
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
});
</script>
