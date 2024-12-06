import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCountriesQuery } from "../services/citiesApi";
import PopulationChart from "./PopulationChart";

const CountryPopulation = () => {
	const navigate = useNavigate();
	const { data: countries, isLoading } = useGetAllCountriesQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<PopulationChart
				data={countries}
				onBarClick={(barData) => {
					navigate(`/country/${barData.name}`);
				}}
				label='Countries'
			/>
		</>
	);
};

export default CountryPopulation;
