export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      encodeURIComponent: (uri: string) => encodeURI(uri),
    },
  };
});
