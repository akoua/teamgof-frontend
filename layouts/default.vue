<template>
  <div class="wrapper">
    <ClientOnly>
      <TheHeader />
    </ClientOnly>
    <main>
      <slot />
    </main>
    <TheFooter />
    <TheTeamCreateModal />
    <TheTeamModal />
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
}
</style>
