interface UserData {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    epreuves: [
      {
        championshipId: number;
        riderScore: number;
      }
    ];
  };
}
