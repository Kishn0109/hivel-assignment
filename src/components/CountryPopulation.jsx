import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCountriesQuery } from "../services/citiesApi";
import PopulationChart from "./PopulationChart";
import SkeletonLoader from "./SkeletonLoader";
const CountryPopulation = () => {
	const navigate = useNavigate();
	const { data: countries, isLoading } = useGetAllCountriesQuery();

	if (isLoading) {
		return <SkeletonLoader />;
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
