interface UserData {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    epreuves: [
      {
        championshipId: number;
        riderScore: number;
      }
    ];
  };
}
