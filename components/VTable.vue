<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <slot name="head"></slot>
      </thead>
      <tbody>
        <slot name="body"></slot>
      </tbody>
    </table>
  </div>
</template>
