import Team from "~/models/team.model";
import instance from "./axios";

class TeamsService {
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

export default new TeamsService();
