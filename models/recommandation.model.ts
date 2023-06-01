export default interface Recommandation {
  teams?: Array<RecommandationTeam>;
  disciplines?: Array<RecommandationDiscipline>;
}


/* Recommandation team */
export interface RecommandationTeam {
  id?: number;
  name: string;
  description: string;
  motivation: string;
  departement: string;
  members?: Array<TeamMember>;
  sessions: Array<string>;
}

export interface TeamMember {
  firstName: string;
  lastName: string;
  ffe: string;
}

/* Recommandation discipline */
export interface RecommandationDiscipline {
  discipline: string;
  epreuves?: Array<EpreuveDiscipline>;
}

export interface EpreuveDiscipline {
  epreuve: string;
  minimalCondition: {reason: string, valid: boolean};
  remainingPoint: number;
  championships: Array<string>
}