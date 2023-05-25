<template>
  <div
    class="hero min-h-screen"
    style="
      background-image: url(/images/markus-spiske-hjjutbg_F1g-unsplash.jpeg);
    "
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content md:px-20">
      <div class="max-w-xl">
        <h1 class="mb-5 text-2xl font-bold">
          Plongez dans l'univers du sport et trouvez votre équipe idéale !
          Rencontrez des coéquipiers passionnés, partagez des moments uniques et
          réalisez ensemble de grandes victoires
        </h1>
        <NuxtLink to="/teams">
          <button class="btn btn-primary">Consulter les équipes</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
