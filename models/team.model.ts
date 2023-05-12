interface Team {
  id: number;
  title: string;
  level: string;
  location: string;
  imageUrl: string;
  description: string;
  motivation: string;
  members: Array<TeamMember>;
}

interface TeamMember {
  firstName: string;
  lastName: string;
  ffeNumber: string;
}

export default Team;
