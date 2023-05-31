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
  async signup(data : FormData): Promise<any> {
    let result : any = null;
    await instance
      .post("/login/sign-up", data)
      .then((response) => {
        const responseObject = response.data;
        result = { success: responseObject.success, data: "Votre compte a été créé avec succès" }; 
      })
      .catch(error => {
        const errorObject = error.response.data;
        const errorApi = errorObject.error.message;
        result = { success: false, data: errorApi }; 
      });
      return result;
  }
}

export default new AuthService();
