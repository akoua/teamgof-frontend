import { PrecisionItem } from "./precision.model";

export interface Championship {
  titles: Array<string>;
  discipline: string;
  session: Session;
  exclusion: string;
  helpFileUrl: string;
  qualification: {
    qualificationCavalier: number;
    qualificationEquide: number;
  };
  details: Array<PrecisionItem>;
}

export interface ChampionshipGet {
  id: number;
  title: string;
  disciplineId: string;
  session: Session;
  exclusion: string;
  helpFileUrl: string;
  qualification: {
    qualificationCavalier: number;
    qualificationEquide: number;
  };
  details: Array<PrecisionItem>;
}

export enum Session {
  PONEY,
  CLUBS,
}
