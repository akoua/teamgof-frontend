<script lang="ts">
import { mapState } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export default defineComponent({
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated', 'connectedUser']),
  },
})
</script>

<template>
  <nav>
    <div class="navbar bg-base-100 md:px-4">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 shadow bg-base-100 rounded-box w-52"
          >
            <li class="font-bold uppercase">
              <NuxtLink to="/teams">les équipes</NuxtLink>
            </li>
            <li class="font-bold uppercase">
              <NuxtLink to="/sign-up">
                inscription
              </NuxtLink>
            </li>
            <li class="font-bold uppercase">
              <NuxtLink to="/sign-in">
                connexion
              </NuxtLink>
            </li>
          </ul>
        </div>
        <NuxtLink to="/" class="text-2xl font-extrabold">
          TEAMGOF
        </NuxtLink>
      </div>
      <div class="navbar-end invisible md:visible">
        <ul class="menu menu-horizontal px-1">
          <li class="font-bold uppercase">
            <NuxtLink to="/teams">les équipes</NuxtLink>
          </li>
          <li class="font-bold uppercase" v-if="!isAuthenticated">
            <NuxtLink to="/sign-in"> Connexion </NuxtLink>
          </li>
        </ul>
        <div v-if="!isAuthenticated">
          <NuxtLink to="/sign-up" class="ml-4 btn btn-primary">
            Inscription
          </NuxtLink>
        </div>
        <TheUserDropdown v-if="isAuthenticated" />
      </div>
    </div>
  </nav>
</template>
