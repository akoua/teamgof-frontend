<template>
  <h1 class="font-extrabold uppercase text-3xl">{{ title }}</h1>
  <h2 class="mt-1">
    {{ subTitle }}
  </h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
    },
  },
});
</script>

<style scoped></style>
