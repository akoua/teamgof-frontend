<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input
      type="text"
      v-model="content"
      :placeholder="placeholder"
      class="input input-bordered w-full max-w-xs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      content: "",
    };
  },
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    clearContent(): void {
      this.content = "";
    },
  },
});
</script>
