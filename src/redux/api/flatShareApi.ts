// src/services/apis/flatShareApi.js

import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { IMeta, TFlatRequest } from "@/types";

const flatShareApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addFlatShareRequest: build.mutation({
      query: (data) => ({
        url: "/flat-request",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.flatRequest],
    }),
    getAllFlatShareRequests: build.query({
      query: (args: Record<string, any>) => ({
        url: "/flat-request",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: TFlatRequest[], meta: IMeta) => {
        return {
          flatShareRequests: response,
          meta,
        };
      },
      providesTags: [tagTypes.flatRequest],
    }),
    getFlatShareRequestById: build.query({
      query: (id: string) => ({
        url: `/flat-request/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.flatRequest],
    }),
    updateFlatShareRequestStatus: build.mutation({
      query: (data) => ({
        url: `/flat-request/status/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.flatRequest],
    }),
    deleteFlatShareRequest: build.mutation({
      query: (id: string) => ({
        url: `/flat-request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.flatRequest],
    }),
  }),
});

export const {
  useAddFlatShareRequestMutation,
  useGetAllFlatShareRequestsQuery,
  useGetFlatShareRequestByIdQuery,
  useUpdateFlatShareRequestStatusMutation,
  useDeleteFlatShareRequestMutation,
} = flatShareApi;

export default flatShareApi;
