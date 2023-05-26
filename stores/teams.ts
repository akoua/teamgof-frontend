<<<<<<< HEAD
import { defineStore } from 'pinia'
import { useFiltersStore } from './filters'
import type Team from '~/models/team.model'
import teamsService from '~/common/teams.service'

=======
import { defineStore } from "pinia";
import Team from "~/models/team.model";
import { useFilterStore } from "./filter";
import instance from "~/common/axios";
import teamService from "~/common/team.service";
import TeamCreate from "~/models/team.create.model";
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
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
<<<<<<< HEAD
    selectedTeam: state => state.team,
    userTeams: state => state.teams,
    allTeams: (state) => {
      const filtersStore = useFiltersStore()
      const { levels, locations, motivations } = filtersStore
=======
    selectedTeam: (state) => state.team,
    isLoading: (state) => state.loading,
    allLevels: (state) => {
      const levelsSet = new Set<string>();
      state.teams.forEach((team) => {
        team.epreuves.forEach((epreuve) => {
          epreuve.championshipNames.forEach((championship) => {
            levelsSet.add(championship);
          });
        });
      });
      return Array.from(levelsSet);
    },
    allLocations: (state) => {
      const locationsSet = new Set<string>();
      state.teams.forEach((team) => {
        locationsSet.add(team.departement);
      });
      return Array.from(locationsSet);
    },
    allMotivations: (state) => {
      const motivationsSet = new Set<string>();
      state.teams.forEach((team) => {
        motivationsSet.add(team.motivation);
      });
      return Array.from(motivationsSet);
    },
    filteredTeams: (state) => {
      const filterStore = useFilterStore();
      const { selectedLevels, selectedLocations, selectedMotivations } =
        filterStore;
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b

      const filteredTeams = state.teams.filter((team) => {
<<<<<<< HEAD
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
=======
        const isLevelMatched =
          selectedLevels.length === 0 ||
          selectedLevels.some((level) =>
            team.epreuves.some((epreuve) =>
              epreuve.championshipNames.includes(level)
            )
          );

        const isLocationMatched =
          selectedLocations.length === 0 ||
          selectedLocations.includes(team.departement);

        const isMotivationMatched =
          selectedMotivations.length === 0 ||
          selectedMotivations.includes(team.motivation);

        return isLevelMatched && isLocationMatched && isMotivationMatched;
      });
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b

      return filteredTeams
    },
    getFilteredTeams: (state) => (filters: any) => {
      return state.teams.filter((team) => {
        const levelMatch =
          filters.levels.length === 0 ||
          team.epreuves.some((epreuve) =>
            filters.levels.includes(epreuve.discipline)
          );
        const locationMatch =
          filters.locations.length === 0 ||
          filters.locations.includes(team.departement);
        const motivationMatch =
          filters.motivations.length === 0 ||
          filters.motivations.includes(team.motivation);

        return levelMatch && locationMatch && motivationMatch;
      });
    },
  },
  actions: {
    setSelectedTeam(team: Team) {
      this.team = team
    },
    async fetchAllTeams(): Promise<void> {
<<<<<<< HEAD
      this.loading = true
      await teamsService
=======
      this.loading = true;
      await teamService
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
        .getTeams()
        .then((teams) => {
          this.teams = teams
        })
        .finally(() => {
          this.loading = false
        })
    },
<<<<<<< HEAD
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

=======
    async createTeam(team: TeamCreate): Promise<void> {
      this.loading = true;
      await teamService
        .createTeam(team)
        .then((newTeam) => {
          this.teams.push(newTeam!);
        })
        .finally(() => {
          this.loading = false;
        });
    },
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
  },
})
