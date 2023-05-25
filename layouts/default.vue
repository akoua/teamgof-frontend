<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="wrapper">
    <ClientOnly>
      <TheHeader />
    </ClientOnly>
    <main>
      <slot />
    </main>
    <TheFooter />
    <TheTeamModal />
  </div>
</template>

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
