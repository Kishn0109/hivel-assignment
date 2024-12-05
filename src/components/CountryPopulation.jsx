import React from "react";
import { useGetAllCountriesQuery } from "../services/citiesApi";
import PopulationChart from "./PopulationChart";

const CityPopulation = () => {
	const { data: countries } = useGetAllCountriesQuery();
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
			<PopulationChart data={countries} />
		</div>
	);
};

export default CityPopulation;
