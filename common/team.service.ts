import Team from "~/models/team.model";
import instance from "./axios";
import TeamCreate from "~/models/team.create.model";

class TeamService {
  async updateTeam(team: Team) {
    return instance.put(`/team/update/${team.id}`, team).then(response => response.data)
  }

  async deleteTeam(teamID: number) {
    return instance.delete(`/team/delete/${teamID}`)
  }

  async createTeam(team: TeamCreate): Promise<Team | null> {
    var teamResult: Team | null = null;
    await instance
      .post("/team/create", team)
      .then((result) => {
        teamResult = result.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return teamResult;
  }

  async getTeams(): Promise<Array<Team>> {
    var teams: Array<Team> = [];
    let end = 24;
    await instance
      .get("/team/allTeams", {
        params: {
          end,
        },
      })
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
