<template>
  <div class="flex flex-col items-center justify-center bg-base-300">

     <template v-if="$route.params.success">
        <AlertSucces :message="$route.params.data" />
     </template>

    <div class="p-8 bg-secondary rounded-md shadow-md w-full">
      <div class="flex flex-col mb-5">
        <h1 class="text-3xl font-bold color text-center">TEAMGOF</h1>
        <h3 class="text-1xl color text-center">Ravis de vous revoir !</h3>
      </div>

      <div class="form-control mb-2">
        <label class="label"> Adresse email* : </label>
        <div class="relative">
          <div
            class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-gray-400"
          >
            <Icon name="fe:mail" />
          </div>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="jeandupont@exemple.fr"
            class="input input-bordered w-full text-black pl-10"
          />
        </div>
      </div>

      <div class="form-control mb-2">
        <label class="label"> Mot de passe* : </label>
        <div class="relative">
          <div
            class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-gray-400"
          >
            <Icon name="fe:lock" />
          </div>
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            class="input input-bordered w-full text-black pl-10"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <div>
          <NuxtLink class="mb-6 float-right text-sm" to="#"
            >Mot de passe oublié ?</NuxtLink
          >
        </div>

        <div class="flex justify-center mb-6">
          <button
            @click="handleLogin()"
            class="btn btn-primary justify-center normal-case"
            :disabled="isLoading"
          >
            Connexion
          </button>
        </div>

        <div class="flex justify-center space-x-2">
          <div>Pas encore de compte ?</div>
          <NuxtLink class="text-primary" to="/sign-up"> Inscription</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { mapActions, mapState } from "pinia";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["connectedUser", "isLoading"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
    async handleLogin() {
      if (!this.email || !this.password) {
        alert(
          "Veuillez entrer votre adresse e-mail et votre mot de passe pour vous connecter."
        );
      } else {
        await this.login(this.email, this.password).finally(async () => {
          if (this.connectedUser) {
            await navigateTo("/protected");
          }
        });
      }
    },
  },
});
</script>

