import Team from "~/models/team.model";
import instance from "./axios";
import TeamCreate from "~/models/team.create.model";

class TeamService {
  async createTeam(team: TeamCreate): Promise<void> {
    await instance.post("/team/create", team).catch((error) => {
      console.error(error);
    });
  }

  async getTeams(): Promise<Array<Team>> {
    var teams: Array<Team> = [];
    await instance
      .get("/team/allTeams")
      .then((result) => {
        teams = result.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return teams;
  }
}

export default new TeamService();
