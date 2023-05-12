<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<!-- Make Dynamic Title-->
<script setup>
  useHead({
    titleTemplate: (pageName) => {
      return pageName
        ? `${pageName} - TEAMGOF`
        : 'TEAMGOF'
    }
  })
</script>

