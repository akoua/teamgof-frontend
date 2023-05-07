<template>
  <nav>
    <div class="navbar bg-base-100 md:px-20">
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
              <NuxtLink to="/teams">Equipes</NuxtLink>
            </li>
            <li class="font-bold uppercase">
              <NuxtLink to="/sign-up">Inscription</NuxtLink>
            </li>
            <li class="font-bold uppercase">
              <NuxtLink to="/login">Connexion</NuxtLink>
            </li>
          </ul>
        </div>

        <NuxtLink to="/" class="text-2xl font-extrabold">TEAMGOF</NuxtLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li class="font-bold uppercase">
            <NuxtLink to="/teams">Equipes</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end invisible md:visible">
        <NuxtLink to="/login" class="btn btn-secondary"> Connexion </NuxtLink>
        <NuxtLink to="/sign-up" class="ml-4 btn btn-primary">
          Inscription
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
