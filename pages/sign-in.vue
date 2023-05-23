<template>
  <SigninContent />
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { mapActions } from "pinia";

export default defineComponent({
  setup() {
    useHead({
      title: "Connexion",
    });

    definePageMeta({
      layout: "register",
    });
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
  },
  created() {
    this.login("yda@gm.com", "123");
  },
});
</script>
