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
		getAllCountries: builder.query({
			query: () => ({
				url: "/countries/population",
				method: "GET",
			}),
			transformResponse: (response) => {
				return response.data.map((country) => {
					const totalPopulation = country.populationCounts.reduce(
						(sum, yearData) => sum + yearData.value,
						0
					);
					return {
						...country,
						totalPopulation,
					};
				});
			},
		}),
	}),
});

export const { useGetCityPopulationMutation, useGetAllCountriesQuery } =
	citiesApi;
