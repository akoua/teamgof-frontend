import { defineStore } from "pinia";
import instance from "~/common/axios";

import authService from "~/common/auth.service";
import { saveUser, destroyUser, getUser } from "@/common/localstorage.service";
export interface AuthState {
  userData: UserData | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    userData: null,
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.userData,
    connectedUser: (state) => state.userData?.user,
    isLoading: (state) => state.loading,
  },
  actions: {
    checkAuth(): void {
      const user = getUser();
      if (user) {
        this.userData = user;
      }
    },
    async login(email: string, password: string): Promise<void> {
      this.userData = null;
      this.loading = true;
      await authService
        .login(email, password)
        .then((result) => {
          this.userData = result;
          saveUser(this.userData);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    logout() {
      this.userData = null;
      destroyUser();
    },
  },
});
