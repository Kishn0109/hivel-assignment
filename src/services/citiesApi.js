import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const citiesApi = createApi({
	reducerPath: "citiesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://countriesnow.space/api/v0.1",
	}),
	endpoints: (builder) => ({
		getCityPopulation: builder.mutation({
			query: (body) => ({
				url: "/countries/population/cities/filter",
				method: "POST",
				body,
			}),
			transformResponse: (response) => {
				return response.data.map((city) => {
					const totalPopulation = city.populationCounts[0].value;

					return {
						...city,
						name: city.city,
						totalPopulation,
					};
				});
			},
		}),
		getAllCountries: builder.query({
			query: () => ({
				url: "/countries/population",
				method: "GET",
			}),
			transformResponse: (response) => {
				return response.data.map((country) => {
					const totalPopulation = Number(country.populationCounts[0].value);
					return {
						...country,
						name: country.code,
						totalPopulation,
					};
				});
			},
		}),
		getSingleCityPopulation: builder.mutation({
			query: (city) => ({
				url: "countries/population/cities",
				method: "POST",
				body: { city: city },
			}),
			transformResponse: (response) => {
				return [
					{
						...response.data,
						name: response.data.city,
						totalPopulation: Number(
							response.data.populationCounts[0]?.value || 0
						),
					},
				];
			},
		}),
	}),
});

export const {
	useGetCityPopulationMutation,
	useGetAllCountriesQuery,
	useGetSingleCityPopulationMutation,
} = citiesApi;
