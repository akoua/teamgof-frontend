import instance from "./axios";
import { Championship, ChampionshipGet } from "~/models/championship.model";

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
        throw error;
      });
    return championshipResult;
  }

  async updateChampionship(
    championship: ChampionshipGet
  ): Promise<Championship | null> {
    const mChampionship: any = {
      ...championship,
      precisions: championship.details.map((oldDetail: any) => ({
        precisionType: oldDetail.precisionType,
        values: { ...oldDetail.values },
      })),
      details: undefined,
    };
    console.log(mChampionship);
    let championshipResult: Championship | null = null;
    await instance
      .put("/epreuves/update", mChampionship)
      .then((result: any) => {
        championshipResult = result.data.data;
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
    return championshipResult;
  }

  async getChampionship(id: number): Promise<ChampionshipGet | null> {
    let championshipResult: Championship | null = null;
    await instance
      .get(`/epreuves/${id}`)
      .then((result: any) => {
        championshipResult = result.data.data;
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
    return championshipResult;
  }
}

export default new ChampionshipService();
