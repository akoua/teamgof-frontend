<template>
  <div class="p-8 bg-secondary rounded-md shadow-md">
    <h1 class="text-3xl font-bold mb-4 color text-center">INSCRIPTION</h1>
    
     <!-- Step Navigation -->
    <ul class="steps">
      <li :class="['step', { 'step-primary': (currentStep===0), 'font-bold': (currentStep===0) }]">Informations personnelles</li>
      <li :class="['step', { 'step-primary': (currentStep===1), 'font-bold': (currentStep===1) }]">Informations de connexion</li>
      <li :class="['step', { 'step-primary': (currentStep===2), 'font-bold': (currentStep===2) }]">Mes qualifications</li>
    </ul>
        
    <!-- Content -->
     <div class="flex flex-col">
      <div class="mt-7 mb-10 justify-center">
        <form>
          <component :is="currentStepComponent" />
        </form>
      </div>
      
      <div class="flex justify-center items-center space-x-4">
        <button v-show="!(currentStep === 0)" @click="currentStep--" class="btn">
          Précédent
        </button>
        <button  @click="currentStep++" class="btn btn-primary">
          {{ (currentStep === steps.length - 1) ? "Terminer" : "Suivant" }}
        </button>
      </div>
    </div>
  </div>
 
</template>

<script>
import Step1 from "@/components/signup/signupStep1.vue";
import Step2 from "@/components/signup/signupStep2.vue";
import Step3 from "@/components/signup/signupStep3.vue";

export default {
  components: {
    Step1,
    Step2,
    Step3,
  },
  data() {
    return {
      /* For step Navigation */
      currentStep: 0,
      steps: [
        {
          component: "Step1",
        },
        {
          component: "Step2",
        },
        {
          component: "Step3",
        },
      ],
    };
  },
  computed: {
    currentStepComponent() {
      return this.steps[this.currentStep].component;
    },
  }
};
</script>


