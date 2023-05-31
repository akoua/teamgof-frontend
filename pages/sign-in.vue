<template>
  <SigninContent />
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    useHead({
      title: "Connexion",
    });

    definePageMeta({
      layout: "register",
    });
  },
});
</script>
