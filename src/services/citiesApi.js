import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const citiesApi = createApi({
	reducerPath: "citiesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://countriesnow.space/api/v0.1",
	}),
	endpoints: (builder) => ({
		getCityPopulation: builder.mutation({
			query: (body) => ({
				url: "/countries/population/cities",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useGetCityPopulationMutation } = citiesApi;
