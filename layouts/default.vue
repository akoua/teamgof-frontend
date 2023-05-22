<template>
  <div class="wrapper">
    <TheHeader />
    <main>
      <slot />
      <TheFAB iconName="fe:plus" />
    </main>
    <TheFooter />
    <TheTeamModal />
    <TheDisciplineModal />
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

<style scoped>
.wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1;
  position: relative;
}
</style>
