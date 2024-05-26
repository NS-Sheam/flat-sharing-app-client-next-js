import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const updateUserProfile = async (data: any) => {
  try {
    const response = await axiosInstance.patch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`, data);

    return response.data;
  } catch (error: any) {
    return error;
  }
};
