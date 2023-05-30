import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
  onNuxtReady(() => {
    const authStore = useAuthStore();
    const router = useRouter();

    if (authStore.isAuthenticated) {
      router.push("/protected");
    } else {
      router.push("/sign-in");
    }
  });
});
