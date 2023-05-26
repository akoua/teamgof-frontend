interface Team {
<<<<<<< HEAD
  id: number
  name: string
  description: string
  motivation: string
  departement: string
  imageUrl?: string
  members: Array<TeamMember>
  epreuves: Array<TeamChampionship>
}

interface TeamMember {
  firstName: string
  lastName: string
  ffe: string
=======
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
>>>>>>> cd4e6ee175a5977f6f3cf2672e08e140932c5a3b
}

interface TeamChampionship {
  discipline: string
  championshipNames: Array<string>
}

export default Team
