import Discipline from "~/models/discipline.model";
import instance from "./axios";

class DisciplineService {
  async getAllDisciplines(): Promise<Array<Discipline>> {
    var disciplines: Array<Discipline> = [];
    await instance
      .get("/disciplines/all/infos")
      .then((result) => {
        disciplines = result.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return disciplines;
  }
}

export default new DisciplineService();
