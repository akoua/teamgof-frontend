import instance from "./axios";

import Precision from "~/models/precision.model";

class PrecisionService {
  async createPrecision(precision: Precision): Promise<Precision | null> {
    let precisionResult: Precision | null = null;
    await instance
      .post("/precisions/create", precision)
      .then((result: any) => {
        precisionResult = result.data.data;
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
    return precisionResult;
  }
}

export default new PrecisionService();
