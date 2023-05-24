import { defineStore } from "pinia";
import { useAxios } from "~/composables/useAxios";

export interface AuthState {
  userData: UserData | null;
  loading: boolean;
}

let axios = useAxios();

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
      const user = localStorage.getItem("user");
      if (user) {
        this.userData = JSON.parse(user);
      }
    },
    async signup(signupPayload: any): Promise<void> {
      await axios.post("/login/sign-up", signupPayload).then((result) => {
        console.log(result.data);
      });
    },
    async login(email: string, password: string): Promise<void> {
      this.userData = null;
      this.loading = true;
      await axios
        .post(
          "/login/sign-in",
          { email },
          {
            auth: {
              username: email,
              password: password,
            },
          }
        )
        .then((result) => {
          let user = result.data.data;
          this.userData = user;
          localStorage.setItem("user", JSON.stringify(user));
        })
        .finally(() => {
          this.loading = false;
        });
    },
    logout() {
      this.userData = null;
      localStorage.removeItem("user");
    },
  },
});
