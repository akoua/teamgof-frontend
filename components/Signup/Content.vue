<template>
  <div class="flex flex-col items-center justify-center bg-base-300">
    
    <template v-if="showComponent">
      <AlertError :message="errorMessage" />
    </template>
   
    <div class="p-8 bg-secondary rounded-md shadow-md">
      <h1 class="text-3xl font-bold mb-4 color text-center">INSCRIPTION</h1>

      <!-- Step Navigation -->
      <ul class="steps">
        <li :class="['step', {'step-primary': currentStep === 0, 'font-bold': currentStep === 0,},]">
          Informations personnelles
        </li>
        <li :class="['step', {'step-primary': currentStep === 1, 'font-bold': currentStep === 1,}, ]">
          Informations de connexion
        </li>
        <li :class="['step', { 'step-primary': currentStep === 2, 'font-bold': currentStep === 2,},]">
          Mes points
        </li>
      </ul>

      <!-- Content -->
      <div class="flex flex-col">
        <div class="mt-7 mb-10 justify-center">
          <form>
            <!-- Step1 -->
            <div v-if="currentStep === 0">
              <div class="form-control mb-2">
                  <label class="label"> Nom : </label>
                  <input type="text" placeholder="Nom*" name="lastname" v-model="formData.lastname" class="input input-bordered w-full text-black" />
              </div>
              <div class="form-control  mb-2">
                  <label class="label"> Prénom : </label>
                  <input type="text" placeholder="Prénom*" name="firstname" v-model="formData.firstname" class="input input-bordered w-full text-black" />
              </div>
              <div class="form-control  mb-2">
                  <label class="label"> Localisation : </label>
                  <input type="text" placeholder="Localisation*" name="location" v-model="formData.location" class="input input-bordered w-full text-black" />
              </div>
              
              <div class="form-control  mb-2">
                  <label class="label"> Numéro FFE : </label>
                  <input type="text" placeholder="Numéro FFE" name="ffe" v-model="formData.ffe" class="input input-bordered w-full text-black" />
              </div>
            </div> 
            
            <!-- Step2 -->
            <div v-if="currentStep === 1">
              <div class="form-control mb-2">
                  <label class="label"> Email : </label>
                  <input type="email" placeholder="Email*" name="email" v-model="formData.email" class="input input-bordered w-full text-black" />
              </div>
              <div class="form-control  mb-2">
                  <label class="label"> Mot de passe : </label>
                  <input type="password" placeholder="Mot de passe*" name="pwd" v-model="formData.pwd" class="input input-bordered w-full text-black" />
              </div>
              <div class="form-control  mb-2">
                  <label class="label"> Confirmez votre mot de passe : </label>
                  <input type="password" placeholder="Confirmez votre mot de passe*" name="confirmation" v-model="confirmation" class="input input-bordered w-full text-black" />
              </div>
            </div> 
            
            <!-- Step3 -->
            <div v-if="currentStep === 2">
               
              <div class="flex items-center  mb-8">
                  <span class="font-bold mr-3">Ajouter vos points</span>
                  <a class="btn btn-primary p-2" @click="addRow">
                      <Icon name="fe:plus" size="24" class="text-white" />
                  </a>
              </div>
              
              <div class="tab-container">
                <div v-for="(row, index) in rows" :key="index" class="tab flex flex-col mb-14">
                  <div class="flex w-full">
                          <div class="mr-4 w-2/6">
                             <label class="label text-white p-0"> Discipline : </label>
                              <select class="select select-bordered w-full max-w-xs"  v-model="discipline[index]">
                                  <option disabled selected>Discipline ?</option>
                                  <option v-for="discipline in allDisciplines" :value="discipline" :key="discipline.disciplineId">
                                    {{ discipline.disciplineName }}
                                  </option>
                              </select> 
                          </div>
                          <div class="mr-4 w-2/6">
                              <label class="label text-white p-0"> Championnat : </label>
                              <select v-model="championnat[index]" class="select select-bordered w-full max-w-xs">
                                  <option disabled selected>Championnat ?</option>
                                  <option
                                    v-for="championship in discipline[index]?.championships"
                                    :value="championship.championshipId"
                                  >
                                    {{ championship.championshipName }}
                                  </option>
                              </select> 
                          </div>
                          <div class="mr-4 w-1/6">
                            <div class="form-control">
                                <label class="label text-white p-0"> Point : </label>
                                <input type="text" maxlength="4" v-model="qualification[index]"  class="input input-bordered text-black" />
                            </div>
                          </div>
                          <div class="mt-6 w-1/6">
                              <a class="btn btn-base-300 btn-circle" @click="deleteRow(index)">
                                  <Icon name="fe:close" size="22" />
                              </a>
                          </div>
                      </div>
                </div>
              </div>
            
            </div> 
            
          </form>
        </div>

        <div class="flex justify-center items-center space-x-4">
          <button v-show="!(currentStep === 0)" @click="goToPrevious" class="btn">
            Précédent
          </button>
          <button  @click="goToNext" class="btn btn-primary">
            <div v-if="loading"><Icon name="ri:loader-2-fill" size="24" /></div>
            <div v-else="loading">{{ (currentStep === 2) ? "Terminer" : "Suivant" }}</div>
          </button>
        </div>

        <div class="flex justify-center space-x-2 mt-6">
          <div>J'ai déjà un compte ?</div>
          <NuxtLink class="text-primary" to="/sign-in">Connexion</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useDisciplinesStore } from "@/stores/disciplines";
import { mapState, mapActions } from "pinia";


export default defineComponent({
  data() {
    return {
      /* Show alert message */
      showComponent: false,
      errorMessage: '',
      loading:false,
      
      /* For step Navigation */
      currentStep: 0,
      
      /* For form components generate dynamically */
      rows: [],
      championnat: [],
      qualification: [],
      
      /* Form Data */
      discipline: [],
      confirmation:'',
      formData: {
        firstname: '',
        lastname: '',
        epreuves: [],
        email: '',
        pwd: '',
        location: '',
        ffe: '',
      },
    };
  },
  computed: {
    ...mapState(useAuthStore, ["result"]),
    ...mapState(useDisciplinesStore, ["allDisciplines"]),
  },
  async mounted() {
    try {
      await this.fetchAllDisciplines();
      console.log(this.allDisciplines);
    } catch (error) {
      console.error('Failed to fetch API data:', error);
    }
  },
  methods: {
    // Get Store methods
    ...mapActions(useAuthStore, ["signup"]),
    ...mapActions(useDisciplinesStore, ["fetchAllDisciplines"]),
    
    // For Step 3 
    addRow() {
      this.rows.push({discipline: "", niveau: "", qualification: "" });
    },

    deleteRow(index) {
      /* 
      const copiedArray = this.rows.slice();
      copiedArray.splice(index, 1);
      this.rows = copiedArray.slice();
      console.log(this.rows);
      */
      this.rows.splice(index, 1);
    },
    
    // Get Step1 Form Data value
    handleStep1Value() {
      if (this.formData.lastname=="") {
         alert('Entrez le nom svp !');
      } else if (this.formData.firstname==""){
         alert('Entrez le prénom svp !');
      } else if (this.formData.location==""){
         alert('Entrez la localisation svp !');
      } else {
         // Go to Next Step
         this.currentStep++; 
      } 
    },
    
     // Get Step2 Form Data value
     handleStep2Value() {
      if (this.formData.email=="") {
         alert("Entrez l'email svp !");
      } else if (this.formData.pwd==""){
         alert('Entrez le mot de passe svp !');
      } else if (this.confirmation==""){
         alert('Confirmez votre mot de passe svp !');
      } else if (this.formData.pwd!==this.confirmation){
         alert('Les mots de passe ne correspondent pas !');
      } else {
         // Go to Next Step
         this.currentStep++;
      } 
    },
    
    // Get Step3 Form Data value
    async handleStep3Value() {
      // Show loading 
      this.loading = true;
      
      // Fill epreuves tab
      this.formData.epreuves=[]; 
      for (let i = 0; i <= this.rows.length-1; i++) {
         this.formData.epreuves.push({
          "championshipId": this.championnat[i],
          "riderScore": this.qualification[i]
         })
      }
      
      // Api call method
      try {
        await this.signup(this.formData);
        if(this.result.success){
          // hide loading
          this.loading = false;
          
          // Navigate to login
          navigateTo({path: '/sign-in'});
          
        }else{
           // hide loading
           this.loading = false;
          
           // Show error Message
           this.showComponent = true;
           this.errorMessage = this.result.data
           setTimeout(() => {
             this.showComponent = false;
             this.errorMessage= '';
          }, 8000);
        }
      } catch (error) {
        console.error('Failed to fetch API data:', error);
      }
    },
  
    goToPrevious(){
      this.currentStep--;
    },
    
    goToNext(){
      if (this.currentStep===0) {
        this.handleStep1Value();
      } else if (this.currentStep===1) {
        this.handleStep2Value();
      } else if (this.currentStep===2) {
        this.handleStep3Value();
      }
    },
  },
});

</script>
