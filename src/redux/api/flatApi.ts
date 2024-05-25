import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { IMeta, TFlat } from "@/types";

const flatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFlat: build.mutation({
      query: (data) => ({
        url: "/flats",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.flat],
    }),
    getAllFlats: build.query({
      query: (args: Record<string, any>) => ({
        url: "/flats",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: TFlat[], meta: IMeta) => {
        return {
          flats: response,
          meta,
        };
      },
      providesTags: [tagTypes.flat],
    }),
    deleteFlat: build.mutation({
      query: (id) => ({
        url: `/flat/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.flat],
    }),
    //get single flat
    getFlat: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/flats/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.flat],
    }),
    // update a flat
    updateFlat: build.mutation({
      query: (data) => ({
        url: `/flats/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.flat],
    }),
  }),
});

export const {
  useCreateFlatMutation,
  useGetAllFlatsQuery,
  useDeleteFlatMutation,
  useGetFlatQuery,
  useUpdateFlatMutation,
} = flatApi;
