<template>
  <div class="md:px-4 w-full mt-4">
    <ThePageTitle
      title="Gestion des Épreuves"
      sub-title="Donnez vie à vos compétitions sportives"
    />
    <label for="createChampionshipModal" class="btn btn-primary my-4"
      >Créer Une Épreuve</label
    >
    <p class="text-center mt-8" v-show="allDisciplines.length === 0">
      Chargement...
    </p>
    <div class="w-full mt-8" v-show="allDisciplines.length > 0">
      <VTable>
        <template #head>
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Discipline</th>
            <th>Actions</th>
          </tr>
        </template>
        <template #body>
          <tr
            v-for="(item, index) in allChampionshipsAndDisciplines"
            :key="index"
          >
            <th>{{ item.championship.championshipId }}</th>
            <td>{{ item.championship.championshipName }}</td>
            <td>{{ item.discipline.disciplineName }}</td>
            <td>
              <button class="btn btn-info mr-4">
                <Icon name="fe:eye" />
              </button>
              <button class="btn btn-success mr-4">
                <Icon name="fe:pencil" />
              </button>
              <button class="btn btn-error">
                <Icon name="fe:trash" />
              </button>
            </td>
          </tr>
        </template>
      </VTable>
    </div>
    <ClientOnly>
      <TheChampionshipCreateModal />
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useDisciplinesStore } from "~/stores/disciplines";
import Discipline from "~/models/discipline.model";
import { DisciplineChampionship } from "~/models/discipline.model";

export default defineComponent({
  computed: {
    ...mapState(useDisciplinesStore, ["allDisciplines"]),
    allChampionshipsAndDisciplines(): Array<{
      discipline: Discipline;
      championship: DisciplineChampionship;
    }> {
      const championshipsAndDisciplines: Array<{
        discipline: Discipline;
        championship: DisciplineChampionship;
      }> = [];

      this.allDisciplines.forEach((discipline) => {
        const { championships } = discipline;
        championships!.forEach((championship) => {
          championshipsAndDisciplines.push({ discipline, championship });
        });
      });

      return championshipsAndDisciplines;
    },
  },
  methods: {
    ...mapActions(useDisciplinesStore, ["fetchAllDisciplines"]),
  },
  mounted() {
    this.fetchAllDisciplines();
  },
});
</script>
