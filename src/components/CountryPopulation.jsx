import React from "react";
import {
	useGetAllCountriesQuery,
	useGetStatesMutation,
} from "../services/citiesApi";
import PopulationChart from "./PopulationChart";
import { STAGE } from "../constant";

const CityPopulation = ({ setStage }) => {
	const { data: countries, isLoading } = useGetAllCountriesQuery();

	// Later in your code:

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
					setStage({
						name: STAGE.STATE,
						value: barData.country,
					});
				}}
			/>
		</div>
	);
};

export default CityPopulation;
