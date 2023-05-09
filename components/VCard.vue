<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <figure>
      <slot name="card-image"></slot>
    </figure>
    <div class="card-body">
      <slot name="card-body"></slot>
      <div class="card-actions justify-end">
        <slot name="card-button"></slot>
      </div>
    </div>
  </div>
</template>
