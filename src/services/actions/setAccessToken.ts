"use server";
import { authKey } from "@/constants/authkey";
import { redirect } from "next/navigation";

const setAccessToken = (token: string, options?: any) => {
  localStorage.setItem(authKey, token);
  if (options && options?.redirect) {
    redirect(options.redirect);
  }
};

export default setAccessToken;
