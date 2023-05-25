import { defineStore } from 'pinia'
import { useFiltersStore } from './filters'
import type Team from '~/models/team.model'
import teamsService from '~/common/teams.service'

export interface TeamsState {
  team: Team | undefined
  teams: Array<Team>
  loading: boolean
}

export const useTeamsStore = defineStore('teams', {
  state: (): TeamsState => ({
    team: undefined,
    teams: [],
    loading: false,
  }),
  getters: {
    selectedTeam: state => state.team,
    userTeams: state => state.teams,
    allTeams: (state) => {
      const filtersStore = useFiltersStore()
      const { levels, locations, motivations } = filtersStore

      // Filter teams based on the selected filters
      const filteredTeams = state.teams.filter((team) => {
        // Check if any of the team's championship names match the selected levels
        const isLevelMatched
          = levels.length === 0
          || levels.some(level =>
            team.epreuves.some(championship =>
              championship.championshipNames.includes(level),
            ),
          )

        // Check if the team's location is included in the selected locations
        const isLocationMatched
          = locations.length === 0 || locations.includes(team.departement)

        // Check if the team's motivation is included in the selected motivations
        const isMotivationMatched
          = motivations.length === 0 || motivations.includes(team.motivation)

        // Return true if all filters match, false otherwise
        return isLevelMatched && isLocationMatched && isMotivationMatched
      })

      return filteredTeams
    },
  },
  actions: {
    setSelectedTeam(team: Team) {
      this.team = team
    },
    async fetchAllTeams(): Promise<void> {
      this.loading = true
      await teamsService
        .getTeams()
        .then((teams) => {
          this.teams = teams
        })
        .finally(() => {
          this.loading = false
        })
    },
    async updateTeam(updatedTeam: Team): Promise<void> {
      this.loading = true
      await teamsService
        .updateTeam(updatedTeam)
        .then((response) => {
          const index = this.teams.findIndex(team => team.id === updatedTeam.id)
          if (index !== -1)
            this.teams.splice(index, 1, response)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async deleteTeam(teamId: number): Promise<void> {
      const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')
      if (!confirmDelete)
        return // Annuler la suppression si l'utilisateur a choisi "Annuler" dans la boîte de dialogue de confirmation

      this.loading = true
      await teamsService
        .deleteTeam(teamId)
        .then(() => {
          this.teams = this.teams.filter(team => team.id !== teamId)
        })
        .finally(() => {
          this.loading = false
        })
    },

  },
})
