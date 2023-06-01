export default interface Precision {
  epreuveIds: Array<number>;
  precisions: Array<PrecisionItem>;
}

export interface PrecisionItem {
  precisionType: string;
  values: {
    value: number;
    epreuves: Array<number>;
  };
}

export interface PrecisionItemWithName {
  precisionType: string;
  values: {
    value: number;
    epreuves: Array<Championship>;
  };
}

interface Championship {
  championshipId: number;
  championshipName: string;
}

export enum PrecisionType {
  DISCIPLINEPERCENTAGE,
  EVENTINGTYPES,
  NUMBER_OF_PARTICIPATED,
  FINISH_EVENTS,
}
