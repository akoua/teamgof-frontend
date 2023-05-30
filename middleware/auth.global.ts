import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;

  const { isHydrating } = useNuxtApp();
  const authStore = useAuthStore();

  authStore.checkAuth();

  const isAuthenticated = authStore.isAuthenticated;

  if (isHydrating) {
    // If the app is still hydrating, return early and let the client-navigation plugin handle the initial navigation
    return;
  }

  if (to.path === "/protected") {
    if (!isAuthenticated) {
      return "/sign-in";
    }
  } else if (to.path === "/sign-in" || to.path === "/sign-up") {
    if (isAuthenticated) {
      return "/protected";
    }
  }
});
