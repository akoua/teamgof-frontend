<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    fixedWidth: {
      type: Boolean,
    },
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <div
    class="card bg-base-100 shadow-xl"
    :class="fixedWidth ? 'w-96' : 'w-full'"
  >
    <figure>
      <slot name="card-image" />
    </figure>
    <div class="card-body">
      <slot name="card-body" />
      <div class="card-actions justify-end">
        <slot name="card-button" />
      </div>
    </div>
  </div>
</template>
