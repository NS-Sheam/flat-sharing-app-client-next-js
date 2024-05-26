import { TSuccessResponse } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getMyProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/user",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    updateUserStatus: builder.mutation({
      query: (data) => {
        return {
          url: `/user/${data.id}/status`,
          method: "PATCH",
          body: data.body,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetMyProfileQuery, useUpdateProfileMutation, useUpdateUserStatusMutation } =
  userApi;
