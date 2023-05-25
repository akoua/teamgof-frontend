<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useTeamsStore } from '~/stores/teams'
import type Team from '~/models/team.model'

export default defineComponent({
  setup() {
    useHead({
      title: 'Listes des équipes',
    })
  },
  computed: {
    ...mapState(useTeamsStore, ['userTeams']),
  },
  methods: {
    ...mapActions(useTeamsStore, ['updateTeam', 'deleteTeam', 'fetchAllTeams']),
    updateTeamEquipe(team: Team) {
      this.updateTeam(team)
    },
    deleteTeamEquipe(team: Team) {
      this.deleteTeam(team)
    },
  },

  created() {
    this.fetchAllTeams()
  },

})
</script>

<template>
  <div>
    <h1 class="style-1 text-center">
      Liste des équipes
    </h1>
  </div>
  <table class="table w-full">
    <thead>
      <tr class="white-text">
        <th>name</th>
        <th>description</th>
        <th>motivation</th>
        <th>département</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="team in userTeams " :key="team.id">
        <td>{{ team.name }}</td>
        <td>{{ team.description }}</td>
        <td>{{ team.motivation }}</td>
        <td>{{ team.departement }}</td>
        <th>
          <div style="display: flex; justify-content: space-evenly;">
            <button class="btn btn-success" @click="updateTeamEquipe(team)">update</button>
            <button class="btn btn-error" @click="deleteTeamEquipe(team)">delete</button>
          </div>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>

<style>
.button-container {
  display: flex;
  justify-content: space-between;
  margin-left: 1cm;
  margin-right: 1cm;
}
.style-1 {
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.text-center {
  text-align: center;
}
.white-text {
  color: white;
}
</style>
