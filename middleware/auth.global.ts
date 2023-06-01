import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  const authStore = useAuthStore();

  authStore.checkAuth();
  const isAuthenticated = authStore.isAuthenticated;

  if (
    to.path === "/protected" ||
    to.path === "/disciplines" ||
    to.path === "/championships"
  ) {
    if (!isAuthenticated) {
      return navigateTo("/sign-in");
    } else {
      if (to.path === "/disciplines" || to.path === "/championships") {
        const connectedUser = authStore.connectedUser;
        if (connectedUser!.role !== "ADMIN") {
          return navigateTo("/");
        }
      }
    }
  } else if (to.path === "/sign-in" || to.path === "/sign-up") {
    if (isAuthenticated) {
      return navigateTo("/protected");
    }
  }
});
