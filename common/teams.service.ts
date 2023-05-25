import instance from './axios'
import type Team from '~/models/team.model'

class TeamsService {
  updateTeam(team: Team) {
    return instance.put(`/team/update/${team.id}`, team).then(response => response.data)
  }

  deleteTeam(teamID: number) {
    return instance.delete(`/team/delete/${teamID}`)
  }

  async getTeams(): Promise<Array<Team>> {
    let teams: Array<Team> = []
    await instance
      .get('/team/allTeams')
      .then((result) => {
        teams = result.data.data
      })
      .catch((error) => {
        console.error(error)
      })
    return teams
  }
}

export default new TeamsService()
