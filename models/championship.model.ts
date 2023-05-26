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
}

export enum Session {
  PONEY,
  CLUBS,
}
