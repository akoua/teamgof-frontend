<template>
  <div class="md:px-4 w-full mt-4" v-show="selectedChampionship">
    <ThePageTitle
      :title="pageTitle"
      sub-title="Donnez vie à vos compétitions sportives"
    />
    <div class="w-full mt-8">
      <VTab tab1-title="Détails" tab2-title="Précisions">
        <template #content1> </template>
        <template #content2>b </template>
      </VTab>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useDisciplinesStore } from "~/stores/disciplines";
export default defineComponent({
  setup() {
    const route = useRoute();
    const championshipId = route.params.id;

    return {
      championshipId,
    };
  },
  methods: {
    ...mapActions(useDisciplinesStore, ["setSelectedChampionship"]),
  },
  computed: {
    ...mapState(useDisciplinesStore, ["selectedChampionship"]),
    pageTitle(): string {
      return `Gestion ${this.selectedChampionship?.championshipName}`;
    },
  },
  mounted() {
    this.setSelectedChampionship(parseInt(this.championshipId as string, 10));
  },
  watch: {
    selectedChampionship(newValue) {
      useHead({
        title: newValue?.championshipName,
      });
    },
  },
});
</script>

<style scoped></style>
