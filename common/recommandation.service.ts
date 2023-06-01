import Recommandation from "~/models/recommandation.model";
import instance from "./axios";
import { getUser } from "./localstorage.service";

class RecommandationService {
  async getAllRecommandations(): Promise<Array<Recommandation>> {
    var recommandations: Array<Recommandation> = [];
    const userId = getUser().user.userId;
    await instance
      .get(`/suggested/${userId}`)
      .then((result) => {
        recommandations = result.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return recommandations;
  }
}

export default new RecommandationService();
