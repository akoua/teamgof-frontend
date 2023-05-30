import instance from "./axios";
import { Championship } from "~/models/championship.model";

class ChampionshipService {
  async createChampionship(
    championship: Championship
  ): Promise<Championship | null> {
    let championshipResult: Championship | null = null;
    await instance
      .post("/epreuves/add", championship)
      .then((result: any) => {
        championshipResult = result.data.data;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return championshipResult;
  }
}

export default new ChampionshipService();
