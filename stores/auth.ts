<<<<<<< HEAD
import { defineStore } from 'pinia'

import authService from '~/common/auth.service'
import { destroyUser, getUser, saveUser } from '@/common/localstorage.service'
=======
import { defineStore } from "pinia";
import { useAxios } from "~/composables/useAxios";
import instance from "~/common/axios";
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b

export interface AuthState {
<<<<<<< HEAD
  userData: UserData | null
  loading: boolean
=======
  userData: UserData | null;
  loading: boolean;
  result: any;
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userData: null,
    loading: false,
     result: { success: false, data: null }
  }),
  getters: {
    isAuthenticated: state => !!state.userData,
    connectedUser: state => state.userData?.user,
    isLoading: state => state.loading,
  },
  actions: {
    checkAuth(): void {
      const user = getUser()
      if (user)
        this.userData = user
    },
    async login(email: string, password: string): Promise<void> {
      this.userData = null
      this.loading = true
      await authService
        .login(email, password)
        .then((result) => {
          this.userData = result
          saveUser(this.userData)
        })
        .finally(() => {
          this.loading = false
        })
    },
    logout() {
      this.userData = null
      destroyUser()
    },
    async signup(data : FormData): Promise<void> {
      await axios
        .post("/login/sign-up", data)
        .then((response) => {
          this.result = { success: true, data: response.data }; // Update result with success status and data
        })
        .catch(error => {
          this.result = { success: false, data: error }; // Update postResult with error status and errorMessage
        });
    },
  },
})
