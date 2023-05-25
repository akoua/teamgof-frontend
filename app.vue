<script setup>
useHead({
  titleTemplate: (pageName) => {
    return pageName ? `${pageName} - TEAMGOF` : 'TEAMGOF'
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
