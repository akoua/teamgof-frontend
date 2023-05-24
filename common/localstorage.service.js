let USER = "user";

export const getUser = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(USER));
  }
};

export const getAccessToken = () => {
  return getUser()?.accessToken;
};
export const getRefreshToken = () => {
  return getUser()?.refreshToken;
};

export const saveUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER, user);
  }
};

export const destroyUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER);
  }
};

export default { getUser, saveUser, destroyUser };
