import instance from "~/common/axios";

class AuthService {
  async refreshToken(refreshToken: string): Promise<string> {
    var accessToken = "";
    await instance
      .post("/token/refreshToken", {
        refreshToken: refreshToken,
      })
      .then((result) => {
        accessToken = result.data.data.accessToken;
      })
      .catch((error) => {
        console.error(error);
      });
    return accessToken;
  }

  async login(email: string, password: string): Promise<UserData | null> {
    let userData = null;
    await instance
      .post(
        "/login/sign-in",
        { email },
        {
          auth: {
            username: email,
            password: password,
          },
        }
      )
      .then((result) => {
        userData = result.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    return userData;
  }
}

export default new AuthService();
