interface Team {
  id?: number;
  name: string;
  description: string;
  motivation: string;
  departement: string;
  imageUrl?: string;
  members?: Array<TeamMember>;
  epreuves: Array<TeamChampionship>;
}

export interface TeamMember {
  firstName: string;
  lastName: string;
  ffe: string;
}

interface TeamChampionship {
  discipline: string;
  championshipNames: Array<string>;
}

export default Team;
