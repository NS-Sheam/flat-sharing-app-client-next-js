import { authKey } from "@/constants/authkey";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { removeUserInfo } from "../auth.services";

const logoutUser = (router: AppRouterInstance) => {
  removeUserInfo();
  localStorage.removeItem(authKey);
  router.push("/");
  router.refresh();
};

export default logoutUser;
