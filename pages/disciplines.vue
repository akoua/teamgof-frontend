<template>
  <div class="px-1 md:px-20 w-full">
    <TheTitle
      title="Disciplines"
      sub-title="Organisez et configurez les disciplines du General Open Rallye de France"
    />
    <div class="my-8">
      <label for="addModal" class="btn btn-primary"
        ><Icon name="fe:plus" size="24" class="mr-2" /> Ajouter une nouvelle
        discipline</label
      >
      <div class="mt-8">
        <VTable>
          <template v-slot:table-header>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </template>
          <template v-slot:table-body>
            <tr v-for="sport in allSports" :key="sport.id">
              <th>{{ sport.id }}</th>
              <td>{{ sport.title }}</td>
              <td>
                <label
                  for="sportModal"
                  class="btn btn-success mr-12"
                  @click="handleEditSport(sport)"
                >
                  <Icon name="fe:pencil" />
                </label>
                <button class="btn btn-error" @click="handleDeleteSport(sport)">
                  <Icon name="fe:trash" />
                </button>
              </td>
            </tr>
          </template>
        </VTable>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useSportsStore } from "@/stores/sports";
import Sport from "~/models/sport.model";

export default defineComponent({
  setup() {
    useHead({
      title: "Disciplines",
    });
    return {};
  },
  computed: {
    ...mapState(useSportsStore, ["allSports"]),
  },
  methods: {
    ...mapActions(useSportsStore, ["setSelectedSport"]),
    handleEditSport(sport: Sport) {
      this.setSelectedSport(sport);
    },
    handleDeleteSport(sport: Sport) {
      if (
        confirm(
          `Êtes-vous sûr de vouloir supprimer la discipline ${sport.title}  ?`
        )
      ) {
        console.log(sport);
      }
    },
  },
});
</script>

<style scoped></style>
