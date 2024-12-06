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
		<div
			style={{
				width: "100vw",
				height: "80vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: "2px solid red",
				marginRight: "auto",
				marginLeft: "auto",
			}}>
			<PopulationChart
				data={countries}
				onBarClick={(barData) => {
					navigate(`/country/${barData.name}`);
				}}
				label='Countries'
			/>
		</div>
	);
};

export default CountryPopulation;
