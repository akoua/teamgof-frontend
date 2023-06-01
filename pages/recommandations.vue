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
            <div v-if="allEligibleRecommandations != null" class="grid grid-cols-1 md:grid-cols-4 md:gap-5 gap-y-8 place-items-center w-full">
               <VTeamRecommandation2 :key="team.team.id" v-for="team in allEligibleRecommandations" :team="team" />
            </div>
          </template>
          <template v-slot:tab2>
            <div v-if="allOtherRecommandations != null" class="grid grid-cols-1 md:grid-cols-4 md:gap-5 gap-y-8 place-items-center w-full">
               <VTeamRecommandation :key="team.team.id" v-for="team in allOtherRecommandations" :team="team" />
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
import { useRecommandationsStore } from "@/stores/recommandations";
import { mapState, mapActions } from "pinia";

export default defineComponent({
  setup() {
    useHead({
      title: "Recommandations",
    });
  },
  computed: {
    ...mapState(useRecommandationsStore, ["allRecommandations", "allEligibleRecommandations", "allOtherRecommandations"]),
  },
  async mounted() {
    try {
      await this.fetchRecommandationsEligible();
      console.log("toto "+this.allEligibleRecommandations);
    } catch (error) {
      console.error('Failed to fetch API data:', error);
    }
  
    
    try {
      await this.fetchRecommandationsOther();
    } catch (error) {
      console.error('Failed to fetch API data:', error);
    }
  },
  methods: {
    // Get Store methods
    ...mapActions(useRecommandationsStore, ["fetchAllRecommandations", "fetchRecommandationsEligible", "fetchRecommandationsOther"])
  }
});
</script>