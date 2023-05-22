<template>
  <div class="md:px-20 w-full mt-8">
    <h1 class="font-extrabold text-3xl normal-case">Recommandations</h1>
    <h2 class="mt-1">
      Trouvez les équipes qu'on vous recommande en fonction de vos 
      <NuxtLink class="text-primary" to="/qualifications">qualifications enregistrées</NuxtLink> .
    </h2>
    <div class="flex flex-col items-center my-12">
      <div class="flex flex-col md:flex-row">
        <Tab>
          <template v-slot:tab1>
            <div class="grid grid-cols-1 md:grid-cols-4 md:gap-5 gap-y-8 place-items-center w-full">
               <VTeamCard :key="team.id" v-for="team in allTeams" :team="team" />
            </div>
          </template>
          <template v-slot:tab2>
            <div>
              <h2>Tab 2 Content</h2>
              <p>This is the content for Tab 2.</p>
            </div>
          </template>
        </Tab>
        
      </div>
      <!--<VPagination />-->
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useTeamsStore } from "~/stores/teams";
import { mapState } from "pinia";

export default defineComponent({
  setup() {
    useHead({
      title: "Recommandations",
    });
  },
  computed: {
    ...mapState(useTeamsStore, ["allTeams"]),
  },
});
</script>