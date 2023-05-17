<template>
  <VModal id="addModal">
    <h3 class="font-bold text-lg uppercase">Nouvelle {{ title }}</h3>
    <slot />
    <div class="mt-4">
      <button class="btn btn-primary" @click="handleOperation()">
        {{ btnText }}
      </button>
    </div>
  </VModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DATA_TYPES } from "@/utils/constants";
export default defineComponent({
  emits: ["processOperation"],
  props: {
    dataType: {
      type: String,
      required: true,
    },
  },
  computed: {
    title(): string {
      let title: string = "";
      switch (this.dataType) {
        case DATA_TYPES.CHAMPIONSHIP:
          title = "épreuve";
          break;
        case DATA_TYPES.SPORT:
          title = "discipline";
          break;
      }
      return title;
    },
    btnText(): string {
      let text: string = "Créer ";
      switch (this.dataType) {
        case DATA_TYPES.CHAMPIONSHIP:
          text += "l'épreuve";
          break;
        case DATA_TYPES.SPORT:
          text += "la discipline";
          break;
      }
      return text;
    },
  },
  methods: {
    handleOperation(): void {
      this.$emit("processOperation");
    },
  },
});
</script>

<style scoped></style>
