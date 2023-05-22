<template>
  <TheAddModalContent
    :data-type="DATA_TYPES.CHAMPIONSHIP"
    @process-operation="handleCreateDiscipline()"
  >
    <div>
      <VTextInput
        ref="disciplineTitleInputRef"
        placeholder="Nom de l'épreuve"
        label="Entrez le nom de l'épreuve"
      />
    </div>
  </TheAddModalContent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useDisciplinesStore } from "@/stores/disciplines";
import { DATA_TYPES } from "~/utils/constants";
import { VTextInput } from "~/.nuxt/components";
export default defineComponent({
  methods: {
    ...mapActions(useDisciplinesStore, ["createDiscipline"]),
    async handleCreateDiscipline() {
      const disciplineTitleInputRef = this.$refs
        .disciplineTitleInputRef as typeof VTextInput;
      const disciplineTitle = disciplineTitleInputRef?.content;
      if (!disciplineTitle) {
        alert(
          "Le nom de la discipline ne peut pas être vide lors de la création. Veuillez spécifier un nom valide pour la discipline."
        );
      } else {
        await this.createDiscipline({ title: disciplineTitle }).finally(() => {
          disciplineTitleInputRef.clearContent();
        });
      }
    },
  },
});
</script>
