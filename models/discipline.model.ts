export default interface Discipline {
  disciplineId?: number;
  disciplineName: string;
  championships?: Array<DisciplineChampionship>;
}

export interface DisciplineChampionship {
  championshipId: number;
  championshipName: string;
}
