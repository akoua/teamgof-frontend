<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      level: '',
      location: '',
      motivation: '',
      annonceType: 'CCE', // valeur initialisé à CCE par défaut et selectionnée par défaut à chaque réchargement de la page
      results: [],
      selectedResultat: '',
    }
  },
  watch: {
    annonceType(newOption) {
      this.results = []
      this.fetchResults(newOption)
    },
  },
  methods: {
    submitForm() {
      // Code pour soumettre le formulaire ici
      console.log('Formulaire soumis avec succès !')
    },
    fetchResults(option) {
      switch (option) {
        case 'CCE':
          this.results = ['As Poney Elite', 'As Poney 1', 'As Poney 2 D']
          break
        case 'CSO':
          this.results = [
            'As Poney Elite Excellence(130/135)',
            'As Poney Elite(125/130)',
            'As Poney 1(120/125)',
            'Club 1(95/100)',
          ]
          break
        case 'Equifun':
          this.results = [
            'Club Poney Juniors,Cadets et mon Equipe',
            'Club Poney Minimes et moins Equipe',
            'Club Poney Benjamin et moins équipe',
          ]
          break
        default:
          this.results = []
          break
      }
      this.selectedResultat = ''
    },
  },
}
</script>

<template>
  <div class="container mx-auto my-10">
    <h1 class="text-3xl font-bold text-center mb-5">
      Rejoindre un équipe
    </h1>
    <form class="max-w-md mx-auto" @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titre</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="input input-bordered w-full"
          placeholder="Entrez le titre de votre annonce"
          required
        >
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="description"
        >Description</label>
        <textarea
          id="description"
          v-model="description"
          class="textarea textarea-bordered w-full"
          rows="5"
          placeholder="Entrez une description détaillée de votre annonce"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="annonceType"
        >Discipline</label>
        <select
          id="annonceType"
          v-model="annonceType"
          class="select select-bordered w-full"
          required
        >
          <option value="CCE" :selected="annonceType === 'CCE'">
            CCE
          </option>
          <option value="CSO">
            CSO
          </option>
          <option value="Equifun">
            Equifun
          </option>
        </select>
      </div>
      <div id="results" class="mb-4">
        <h2 class="block text-gray-700 text-sm font-bold mb-2">
          Chosir un niveau de {{ annonceType }}
        </h2>
        <select
          id="results"
          v-model="selectedResultat"
          class="select select-bordered w-full"
        >
          <option v-for="result in results" :value="result">
            {{ result }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="motivation"
        >Motivation</label>
        <select
          id="motivatione"
          v-model="motivation"
          class="select select-bordered w-full"
          required
        >
          <option value="" />
          <option value="Convivialité et plaisir">
            Convivialité et plaisir
          </option>
          <option value="Défis et progression">
            Défis et progression
          </option>
          <option value="Esprit d'équipe et compétition">
            Esprit d'équipe et compétition
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="location">Localisation</label>
        <input
          id="location"
          v-model="location"
          type="text"
          class="input input-bordered w-full"
          placeholder="Code postale ou Département"
          required
        >
      </div>

      <button type="submit" class="btn btn-primary mt-5 mx-auto block">
        Poster
      </button>
    </form>
  </div>
</template>
