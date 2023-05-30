import Team from "~/models/team.model";
import instance from "./axios";
import TeamCreate from "~/models/team.create.model";

class TeamService {
  async createTeam(team: TeamCreate): Promise<Team | null> {
    let teamResult: Team | null = null;
    await instance
      .post("/team/create", team)
      .then((result: any) => {
        teamResult = result.data.data;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return teamResult;
  }

  async getTeams(): Promise<Array<Team>> {
    let teams: Array<Team> = [];
    const end = 24;
    await instance
      .get("/team/allTeams", {
        params: {
          end,
        },
      })
      .then((result: any) => {
        teams = result.data.data;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return teams;
  }
}

export default new TeamService();
