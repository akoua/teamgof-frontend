<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">Discipline de l'épreuve</span>
    </label>
    <select class="select select-bordered">
      <option disabled selected>Sélectionner la discipline de l'épreuve</option>
      <template v-if="options.length > 1">
        <option v-for="(option, index) in options" :key="index">
          {{ option }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array<String>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
