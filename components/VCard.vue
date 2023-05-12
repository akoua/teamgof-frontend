<template>
  <div
    class="card bg-base-100 shadow-xl"
    :class="fixedWidth ? 'w-96' : 'w-full'"
  >
    <figure>
      <slot name="card-image"></slot>
    </figure>
    <div class="card-body">
      <slot name="card-body"></slot>
      <div class="card-actions justify-end">
        <slot name="card-button"></slot>
      </div>
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
    fixedWidth: {
      type: Boolean,
    },
  },
});
</script>
