interface Championship {
  id?: number;
  title: string;
  riderQualification: number;
  details: Array<
    DisciplinePercentageDetail | FinishEventsDetail | EventingTypesDetail
  >;
  helpFileUrl?: string;
  exclusion?: string;
  disciplineId: number;
}

export enum DetailType {
  DisciplinePercentage,
  FinishEvents,
  EventingTypes,
}

interface ChampionshipDetail {
  type: DetailType;
}

interface DisciplinePercentageDetail extends ChampionshipDetail {
  value: number;
}

interface FinishEvent {
  numberOfEvents: number;
  numberOfTests: number;
  level: string;
}

interface FinishEventsDetail extends ChampionshipDetail {
  value: FinishEvent;
}

interface EventingTypesDetail extends ChampionshipDetail {
  value: Array<string>;
}

export default Championship;
