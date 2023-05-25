<script lang="ts">
export default defineComponent({
  setup() {
    useHead({
      title: 'Connexion',
    })

    definePageMeta({
      layout: 'register',
    })
  },
})
</script>

<template>
  <SigninContent />
</template>
