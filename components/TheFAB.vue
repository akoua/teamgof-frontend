<template>
  <div class="fab-container">
    <button
      class="p-4 bg-primary text-white rounded-full shadow-lg w-14 z-10"
      @click="emitClickEvent"
    >
      <Icon :name="iconName" />
    </button>
  </div>
</template>

<script>
export default defineComponent({
  emits: ["fabClick"],
  methods: {
    emitClickEvent() {
      this.$emit("fabClick");
    },
  },
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.fab-container {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
}
</style>
