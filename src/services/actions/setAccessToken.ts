import { authKey } from "@/constants/authkey";

const setAccessToken = (token: string) => {
  localStorage.setItem(authKey, token);
};

export default setAccessToken;
