import { defineStore } from "pinia";
import { useAxios } from "~/composables/useAxios";

export interface AuthState {
  user: any,
  result: any
}

let axios = useAxios();

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    result: { success: false, data: null }
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
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
          console.log(result.data);
        });
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
});
