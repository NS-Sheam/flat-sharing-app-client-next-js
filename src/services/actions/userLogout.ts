import { authKey } from "@/constants/authkey";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { removeUserInfo } from "../auth.services";

const logoutUser = (router: AppRouterInstance, options?: Record<string, unknown>) => {
  removeUserInfo();

  options?.redirect && router.push(options.redirect as string);
  router.refresh();
};

export default logoutUser;
