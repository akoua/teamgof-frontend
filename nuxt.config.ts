// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://194.163.158.136:8081/api/v1',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  css: ["@/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@pinia/nuxt"],
  
});
