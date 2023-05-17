<template>
  <TheAddModalContent
    :data-type="DATA_TYPES.SPORT"
    @process-operation="handleCreateSport()"
  >
    <div>
      <VTextInput
        ref="sportTitleInputRef"
        placeholder="Nom de la discipline"
        label="Entrez le nom de la discipline"
      />
    </div>
  </TheAddModalContent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useSportsStore } from "@/stores/sports";
import { DATA_TYPES } from "~/utils/constants";
import { VTextInput } from "~/.nuxt/components";
export default defineComponent({
  methods: {
    ...mapActions(useSportsStore, ["createSport"]),
    async handleCreateSport() {
      const sportTitleInputRef = this.$refs
        .sportTitleInputRef as typeof VTextInput;
      const sportTitle = sportTitleInputRef?.content;
      if (!sportTitle) {
        alert(
          "Le nom de la discipline ne peut pas être vide lors de la création. Veuillez spécifier un nom valide pour la discipline."
        );
      } else {
        await this.createSport({ title: sportTitle }).finally(() => {
          sportTitleInputRef.clearContent();
        });
      }
    },
  },
});
</script>
