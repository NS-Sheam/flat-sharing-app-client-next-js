import { authKey } from "@/constants/authkey";
import { verifyToken } from "@/utils/jwt";
import { getFromLocalStorage } from "@/utils/local-storage";

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = verifyToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem(authKey);
};
