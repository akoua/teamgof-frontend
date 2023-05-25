<template>
  <ClientOnly>
    <input type="checkbox" :id="id" class="modal-toggle" v-model="openModal" />
    <div class="modal" :class="openModal ? 'open-modal' : ''">
      <div class="modal-box relative">
        <label :for="id" class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <slot />
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      openModal: false,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.openModal = false;
    },
  },
});
</script>

<style scoped></style>
