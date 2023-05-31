import { PrecisionItem, PrecisionItemWithName } from "./precision.model";

export interface Championship {
  titles: Array<string>;
  discipline: string;
  session: string;
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
  session: string;
  exclusion: string;
  helpFileUrl: string;
  qualification: {
    qualificationCavalier: number;
    qualificationEquide: number;
  };
  details: Array<PrecisionItemWithName>;
}

export interface ChampionshipPut {
  id: number;
  title: string;
  disciplineId: string;
  session: string;
  exclusion: string;
  helpFileUrl: string;
  qualification: {
    qualificationCavalier: number;
    qualificationEquide: number;
  };
  details?: Array<PrecisionItem>;
}

export enum Session {
  PONEY,
  CLUBS,
}
