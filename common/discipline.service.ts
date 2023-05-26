import Discipline from "~/models/discipline.model";
import instance from "./axios";

class DisciplineService {
  async getAllDisciplines(): Promise<Array<Discipline>> {
    let disciplines: Array<Discipline> = [];
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

  async createDiscipline(discipline: Discipline): Promise<Discipline | null> {
    let disciplineResult: Discipline | null = null;
    const payload = {
      names: [discipline.disciplineName],
    };
    await instance
      .post("/disciplines/add", payload)
      .then((result) => {
        disciplineResult = result.data.data[0];
      })
      .catch((error) => {
        console.error(error);
      });
    return disciplineResult;
  }
}

export default new DisciplineService();
