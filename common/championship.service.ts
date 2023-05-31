import instance from "./axios";
import {
  Championship,
  ChampionshipGet,
  ChampionshipPut,
} from "~/models/championship.model";

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
    championship: ChampionshipPut
  ): Promise<Championship | null> {
    let precisions = undefined;

    if (championship.details) {
      precisions = championship.details!.map((oldDetail: any) => ({
        precisionType: oldDetail.precisionType,
        values: { ...oldDetail.values },
      }));
    }
    const mChampionship: any = {
      ...championship,
      precisions,
      details: undefined,
    };
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
