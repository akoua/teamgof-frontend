<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (pageName) => {
    return pageName ? `${pageName} - TEAMGOF` : "TEAMGOF";
  },
});
</script>
