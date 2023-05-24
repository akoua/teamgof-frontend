import { defineStore } from "pinia";
import Team from "~/models/team.model";
import { useFiltersStore } from "./filters";
export interface TeamsState {
  team: Team | undefined;
  teams: Array<Team>;
  loading: boolean;
}
let axios = useAxios();

export const useTeamsStore = defineStore("teams", {
  state: (): TeamsState => ({
    team: undefined,
    teams: [],
    loading: false,
  }),
  getters: {
    selectedTeam: (state) => state.team,
    allTeams: (state) => {
      const filtersStore = useFiltersStore();
      const { levels, locations, motivations } = filtersStore;

      // Filter teams based on the selected filters
      const filteredTeams = state.teams.filter((team) => {
        // Check if any of the team's championship names match the selected levels
        const isLevelMatched =
          levels.length === 0 ||
          levels.some((level) =>
            team.epreuves.some((championship) =>
              championship.championshipNames.includes(level)
            )
          );

        // Check if the team's location is included in the selected locations
        const isLocationMatched =
          locations.length === 0 || locations.includes(team.departement);

        // Check if the team's motivation is included in the selected motivations
        const isMotivationMatched =
          motivations.length === 0 || motivations.includes(team.motivation);

        // Return true if all filters match, false otherwise
        return isLevelMatched && isLocationMatched && isMotivationMatched;
      });

      return filteredTeams;
    },
  },
  actions: {
    setSelectedTeam(team: Team) {
      this.team = team;
    },
    async fetchAllTeams(): Promise<void> {
      this.loading = true;
      await axios
        .get("/team/allTeams")
        .then((result) => {
          this.teams = result.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
