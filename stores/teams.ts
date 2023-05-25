import { defineStore } from "pinia";
import Team from "~/models/team.model";
import { useFilterStore } from "./filter";
import instance from "~/common/axios";
import teamService from "~/common/team.service";
import TeamCreate from "~/models/team.create.model";
export interface TeamsState {
  team: Team | undefined;
  teams: Array<Team>;
  loading: boolean;
}

export const useTeamsStore = defineStore("teams", {
  state: (): TeamsState => ({
    team: undefined,
    teams: [],
    loading: false,
  }),
  getters: {
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

      const filteredTeams = state.teams.filter((team) => {
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

      return filteredTeams;
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
      this.team = team;
    },
    async fetchAllTeams(): Promise<void> {
      this.loading = true;
      await teamService
        .getTeams()
        .then((teams) => {
          this.teams = teams;
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
  },
});
