import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  let authStore = useAuthStore();

  authStore.checkAuth();
  let isAuthenticated = authStore.isAuthenticated;

  if (to.path === "/protected") {
    if (!isAuthenticated) {
      return navigateTo("/sign-in");
    }
  } else if (to.path === "/sign-in" || to.path === "/sign-up") {
    if (isAuthenticated) {
      return navigateTo("/protected");
    }
  }
});
