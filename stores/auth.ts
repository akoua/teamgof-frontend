import { defineStore } from "pinia";
import { useAxios } from "~/composables/useAxios";

export interface AuthState {
  user: any;
}

let axios = useAxios();

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
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
  },
});
