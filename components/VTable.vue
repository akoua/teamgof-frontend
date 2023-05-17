<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <thead>
        <slot name="table-header" />
      </thead>
      <tbody>
        <slot name="table-body" />
      </tbody>
    </table>
  </div>
</template>
