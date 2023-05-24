import { TeamMember } from "./team.model";

interface TeamCreate {
  name: string;
  description: string;
  motivation: string;
  departement: string;
  imageUrl?: string;
  members?: Array<TeamMember>;
  championshipIds: Array<number>;
}

export default TeamCreate;
