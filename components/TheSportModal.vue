<template>
  <VModal id="sportModal">
    <div v-if="selectedSport">
      <h3 class="font-bold text-lg uppercase">{{ selectedSport.title }}</h3>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Nom de la discipline</span>
        </label>
        <input
          type="text"
          v-model="newTitle"
          :placeholder="selectedSport.title"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="mt-4">
        <button class="btn btn-success" @click="handleEditSport()">
          Mettre à jour la discipline
        </button>
      </div>
    </div>
  </VModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useSportsStore } from "@/stores/sports";
import Sport from "~/models/sport.model";
export default defineComponent({
  data() {
    return {
      newTitle: "",
    };
  },
  computed: {
    ...mapState(useSportsStore, ["selectedSport"]),
  },
  methods: {
    ...mapActions(useSportsStore, ["editSport"]),
    async handleEditSport() {
      if (!this.newTitle) {
        alert(
          "Le nom de la discipline ne peut pas être vide lors de la mise à jour. Veuillez spécifier un nom valide pour la discipline."
        );
      } else {
        const updatedSport: Sport = {
          ...this.selectedSport,
          title: this.newTitle,
        };
        await this.editSport(updatedSport).finally(() => {
          this.newTitle = "";
        });
      }
    },
  },
});
</script>

<style scoped></style>
