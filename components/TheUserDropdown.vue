<template>
  <div v-if="connectedUser">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost rounded-btn">
        <Icon name="fe:user" size="22" class="mr-2" />
        <span class="text-sm"
          >{{ connectedUser.firstName }} {{ connectedUser.lastName }}</span
        >
      </label>
      <ul
        tabindex="0"
        class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li><NuxtLink to="/my-account">Mon compte</NuxtLink></li>
        <li><NuxtLink to="#" @click="handleLogout()">Déconnexion</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "~/stores/auth";
export default defineComponent({
  computed: {
    ...mapState(useAuthStore, ["connectedUser"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    async handleLogout() {
      this.logout();
      await navigateTo("/");
    },
  },
});
</script>

<style scoped></style>
