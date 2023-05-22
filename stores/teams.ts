import { defineStore } from "pinia";
import Team from "~/models/team.model";
import { useFiltersStore } from "./filters";
export interface TeamsState {
  team: Team | undefined;
  teams: Array<Team>;
}

export const useTeamsStore = defineStore("teams", {
  state: (): TeamsState => ({
    team: undefined,
    teams: [
      {
        id: 1,
        title: "Les Galopeurs",
        level: "As Poney Elite",
        motivation: "Convivialité et plaisir",
        location: "Rennes",
        imageUrl:
        "/images/no-image.png",
        description:
          "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
        members: [
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1234456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1244456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "2234456",
          },
        ],
      },
      {
        id: 2,
        title: "Les Galopeurs 2",
        level: "As Poney Elite",
        location: "Paris",
        motivation: "Convivialité et plaisir",
        imageUrl:
        "/images/no-image.png",
        description:
          "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
        members: [
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1234456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1244456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "2234456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "2234457",
          },
        ],
      },
      {
        id: 3,
        title: "Les Galopeurs 2",
        level: "As Poney Elite",
        motivation: "Défis et progression",
        location: "Paris",
        imageUrl:
        "/images/no-image.png",
        description:
          "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
        members: [
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1234456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1244456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "2234456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "2234457",
          },
        ],
      },
      {
        id: 4,
        title: "Les Galopeurs 2",
        level: "As Poney Elite",
        motivation: "Défis et progression",
        location: "Nice",
        imageUrl:
          "/images/no-image.png",
        description:
          "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
        members: [
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1234456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1244456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "2234456",
          },
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "2234457",
          },
        ],
      },
      {
        id: 5,
        title: "Les Galopeurs 5",
        level: "As Poney Elite",
        location: "Paris",
        motivation: "Esprit d'équipe et compétition",
        imageUrl:
        "/images/no-image.png",
        description:
          "Une équipe de cavaliers passionnés de saut d'obstacles, prêts à relever tous les défis ensemble !",
        members: [
          {
            firstName: "John",
            lastName: "Doe",
            ffeNumber: "1234456",
          },
        ],
      },
    ],
  }),
  getters: {
    selectedTeam: (state) => state.team,
    allTeams: (state) => {
      const filtersStore = useFiltersStore();
      const { levels, locations, motivations } = filtersStore;

      // Filter teams based on the selected filters
      const filteredTeams = state.teams.filter((team) => {
        // Check if the team's level is included in the selected levels
        const isLevelMatched =
          levels.length === 0 || levels.includes(team.level);

        // Check if the team's location is included in the selected locations
        const isLocationMatched =
          locations.length === 0 || locations.includes(team.location);

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
  },
});
