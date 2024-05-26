import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/change-password`, data);

    return response.data;
  } catch (error: any) {
    return error;
  }
};
