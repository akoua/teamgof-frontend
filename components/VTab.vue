<template>
  <div>
    <div class="tabs">
      <a
        class="tab tab-lifted"
        @click="activeIndex = 1"
        :class="activeIndex === 1 ? 'tab-active' : ''"
        >{{ tab1Title }}</a
      >
      <a
        class="tab tab-lifted"
        @click="activeIndex = 2"
        :class="activeIndex === 2 ? 'tab-active' : ''"
        >{{ tab2Title }}</a
      >
    </div>
    <div v-show="activeIndex === 1" class="mt-8">
      <slot name="content1"></slot>
    </div>
    <div v-show="activeIndex === 2" class="mt-8">
      <slot name="content2"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      activeIndex: 1,
    };
  },
  props: {
    tab1Title: {
      type: String,
      required: true,
    },
    tab2Title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped></style>
